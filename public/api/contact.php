<?php
// EGC - PHP Lead Mailer Script for Hostinger Shared Hosting
// Features: JSON POST parsing, input sanitization, spam honeypot check, HTML admin notification and HTML user auto-reply.

// Allow CORS for testing/localhost dev
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

// Block non-POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed."]);
    exit();
}

// Load Configuration
require_once __DIR__ . '/config.php';

// Parse incoming JSON body
$raw_input = file_get_contents('php://input');
$data = json_decode($raw_input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid request body."]);
    exit();
}

// Spam Honeypot Check (hidden field "website")
if (!empty($data['website'])) {
    // Silent success response for spambots
    echo json_encode(["success" => true, "message" => "Submitted."]);
    exit();
}

// ─── Extract & Sanitize Data ──────────────────────────────
$name    = isset($data['name']) ? sanitize($data['name']) : '';
$email   = isset($data['email']) ? filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL) : '';
$phone   = isset($data['phone']) ? sanitize($data['phone']) : '—';
$company = isset($data['company']) ? sanitize($data['company']) : '—';
$country = isset($data['country']) ? sanitize($data['country']) : '—';
$interest = isset($data['interest']) ? sanitize($data['interest']) : 'General Inquiry';
$message = isset($data['message']) ? sanitize($data['message']) : '—';
$subject = isset($data['subject']) ? sanitize($data['subject']) : $interest;
$source  = (isset($data['formSource']) && $data['formSource'] === 'modal') ? 'Consultation Popup' : 'Contact Page Form';

// Fallback checks for modal names
if (empty($name) && isset($data['fullName'])) {
    $name = sanitize($data['fullName']);
}
if (empty($company) && isset($data['companyName'])) {
    $company = sanitize($data['companyName']);
}
if (empty($subject) && isset($data['service'])) {
    $subject = sanitize($data['service']);
}

// ─── Validation ───────────────────────────────────────────
$errors = [];
if (strlen($name) < 2) {
    $errors[] = "Name must be at least 2 characters.";
}
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "A valid email address is required.";
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(["success" => false, "message" => $errors[0], "errors" => $errors]);
    exit();
}

// ─── Build Emails ─────────────────────────────────────────
$adminSubject = ADMIN_SUBJECT_PREFIX . $name . " — " . $subject;
$adminHtml = buildAdminEmailHtml($name, $email, $phone, $company, $country, $subject, $message, $source);

$replySubject = AUTO_REPLY_SUBJECT;
$replyHtml = buildAutoReplyHtml($name, $email, $phone, $company, $subject, $message);

// ─── Send Emails ──────────────────────────────────────────
$senderEmail = SMTP_USER;
$contactEmail = CONTACT_EMAIL;

// Common headers for HTML emails
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=UTF-8';
$headers[] = 'From: "' . SENDER_NAME . '" <' . $senderEmail . '>';

// Admin Email Headers
$adminHeaders = $headers;
$adminHeaders[] = 'Reply-To: ' . $email;

// User Auto-Reply Headers
$replyHeaders = $headers;

$adminSent = mail($contactEmail, $adminSubject, $adminHtml, implode("\r\n", $adminHeaders));
$replySent = mail($email, $replySubject, $replyHtml, implode("\r\n", $replyHeaders));

if ($adminSent) {
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Your inquiry has been submitted successfully! Check your email for confirmation."
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to send email. Please try again or contact us directly at " . CONTACT_EMAIL
    ]);
}

// ─── Helper Functions ─────────────────────────────────────
function sanitize($str) {
    return htmlspecialchars(strip_tags(trim($str)), ENT_QUOTES, 'UTF-8');
}

function row($label, $value) {
    return '<tr>
        <td style="padding:6px 0;vertical-align:top;width:160px;">
          <span style="font-size:12px;font-weight:600;color:#7c728a;">' . $label . '</span>
        </td>
        <td style="padding:6px 0;vertical-align:top;">
          <span style="font-size:13px;color:#1a1527;font-weight:500;">' . $value . '</span>
        </td>
      </tr>';
}

function replyRow($label, $value) {
    return '<tr>
        <td style="padding:5px 0;vertical-align:top;width:140px;">
          <span style="font-size:12px;font-weight:600;color:#7c728a;">' . $label . '</span>
        </td>
        <td style="padding:5px 0;vertical-align:top;">
          <span style="font-size:13px;color:#1a1527;">' . $value . '</span>
        </td>
      </tr>';
}

function step($num, $title, $desc) {
    return '<tr>
        <td style="padding:7px 0;vertical-align:top;">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="width:28px;vertical-align:top;padding-right:12px;">
                <div style="width:24px;height:24px;background:#B5893B;border-radius:50%;text-align:center;line-height:24px;font-size:11px;font-weight:700;color:#fff;">' . $num . '</div>
              </td>
              <td style="vertical-align:top;">
                <strong style="font-size:13px;color:#0D2A52;">' . $title . '</strong><br>
                <span style="font-size:12px;color:#7c728a;">' . $desc . '</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>';
}

function buildAdminEmailHtml($name, $email, $phone, $company, $country, $subject, $message, $source) {
    date_default_timezone_set('Asia/Kolkata');
    $ts = date('d/m/Y, h:i A');

    return '<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>New Lead — EGC Ekora Global Consulting</title>
</head>
<body style="margin:0;padding:0;background:#f4f1ec;font-family:\'Segoe UI\',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ec;padding:32px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(13,42,82,0.10);">
      <tr>
        <td style="background:linear-gradient(135deg,#0D2A52 0%,#0b2244 60%,#071730 100%);padding:32px 40px;text-align:center;">
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#B5893B;">EGC EKORA GLOBAL CONSULTING</p>
          <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">New Lead Received</h1>
          <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.6);">via ' . $source . '</p>
        </td>
      </tr>
      <tr>
        <td style="background:#B5893B;padding:10px 40px;text-align:center;">
          <p style="margin:0;font-size:12px;font-weight:700;color:#ffffff;letter-spacing:1px;">ACTION REQUIRED — Please follow up within 24 hours</p>
        </td>
      </tr>
      <tr>
        <td style="padding:36px 40px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-bottom:28px;border-bottom:1px solid #e8e4dc;">
                <p style="margin:0 0 16px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#B5893B;">Contact Information</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  ' . row('👤 Full Name',  $name) . '
                  ' . row('📧 Email',      '<a href="mailto:' . $email . '" style="color:#0D2A52;text-decoration:none;">' . $email . '</a>') . '
                  ' . row('📞 Phone',      $phone !== '—' ? '<a href="tel:' . $phone . '" style="color:#0D2A52;text-decoration:none;">' . $phone . '</a>' : '—') . '
                  ' . row('🏢 Company',    $company) . '
                  ' . row('🌍 Country',    $country) . '
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 0;border-bottom:1px solid #e8e4dc;">
                <p style="margin:0 0 16px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#B5893B;">Inquiry Details</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  ' . row('📋 Subject / Service', $subject) . '
                  ' . row('💬 Message', '<span style="white-space:pre-wrap;">' . nl2br($message) . '</span>') . '
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding-top:24px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  ' . row('🕐 Submitted At', $ts . ' IST') . '
                  ' . row('📂 Form Source', $source) . '
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:0 40px 36px;text-align:center;">
          <a href="mailto:' . $email . '?subject=Re: Your inquiry with EGC Ekora Global Consulting" style="display:inline-block;padding:13px 32px;background:#B5893B;color:#ffffff;text-decoration:none;border-radius:7px;font-weight:700;font-size:14px;letter-spacing:0.3px;">Reply to ' . $name . '</a>
        </td>
      </tr>
      <tr>
        <td style="background:#0D2A52;padding:20px 40px;text-align:center;">
          <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.5);">EGC Ekora Global Consulting · info@ekoraglobalconsulting.com · +91 78929 78516</p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>';
}

function buildAutoReplyHtml($name, $email, $phone, $company, $subject, $message) {
    date_default_timezone_set('Asia/Kolkata');
    $ts = date('d/m/Y, h:i A');

    return '<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Thank You — EGC Ekora Global Consulting</title>
</head>
<body style="margin:0;padding:0;background:#f4f1ec;font-family:\'Segoe UI\',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ec;padding:32px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(13,42,82,0.10);">
      <tr>
        <td style="background:linear-gradient(135deg,#0D2A52 0%,#0b2244 60%,#071730 100%);padding:40px;text-align:center;">
          <div style="width:60px;height:60px;background:rgba(181,137,59,0.2);border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;">
            <span style="font-size:28px;color:#ffffff;font-weight:bold;">✓</span>
          </div>
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#B5893B;">EGC EKORA GLOBAL CONSULTING</p>
          <h1 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;">Thank You, ' . $name . '!</h1>
          <p style="margin:12px 0 0;font-size:14px;color:rgba(255,255,255,0.72);line-height:1.6;">We have received your inquiry and our team will<br>be in touch within <strong style="color:#B5893B;">1–2 business days</strong>.</p>
        </td>
      </tr>
      <tr>
        <td style="padding:36px 40px;">
          <p style="margin:0 0 24px;font-size:15px;color:#3a3344;line-height:1.75;">
            Dear <strong>' . $name . '</strong>,<br><br>
            Thank you for reaching out to <strong>EGC Ekora Global Consulting</strong>. We have received your inquiry and it has been forwarded to our senior advisory team for review.<br><br>
            We understand that your time is valuable and we are committed to providing you with a thoughtful response at the earliest.
          </p>
          <div style="background:#f8f6f2;border:1px solid #e8e4dc;border-radius:10px;padding:24px;margin-bottom:28px;">
            <p style="margin:0 0 16px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#B5893B;">Your Inquiry Summary</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              ' . replyRow('Service / Interest', $subject) . '
              ' . ($company !== '—' ? replyRow('Company', $company) : '') . '
              ' . ($phone !== '—' ? replyRow('Phone', $phone) : '') . '
              ' . replyRow('Message', '<span style="white-space:pre-wrap;font-style:italic;">"' . nl2br($message) . '"</span>') . '
              ' . replyRow('Submitted', $ts . ' IST') . '
            </table>
          </div>
          <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0D2A52;">What Happens Next</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            ' . step('1', 'Review', 'Our experts review your specific requirements carefully.') . '
            ' . step('2', 'Contact', 'A senior advisor will reach out via email or phone.') . '
            ' . step('3', 'Consultation', 'We schedule a free initial consultation at your convenience.') . '
          </table>
          <div style="background:#0D2A52;border-radius:10px;padding:24px;">
            <p style="margin:0 0 14px;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#B5893B;">Need Immediate Assistance?</p>
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:4px 0;font-size:13px;color:rgba(255,255,255,0.8);">📧&nbsp;&nbsp;<a href="mailto:info@ekoraglobalconsulting.com" style="color:#B5893B;text-decoration:none;">info@ekoraglobalconsulting.com</a></td>
              </tr>
              <tr>
                <td style="padding:4px 0;font-size:13px;color:rgba(255,255,255,0.8);">📞&nbsp;&nbsp;<a href="tel:+917892978516" style="color:#B5893B;text-decoration:none;">+91 78929 78516</a></td>
              </tr>
              <tr>
                <td style="padding:4px 0;font-size:13px;color:rgba(255,255,255,0.8);">📍&nbsp;&nbsp;<span>No. 39/3, Richmond Road, Bengaluru</span></td>
              </tr>
            </table>
          </div>
        </td>
      </tr>
      <tr>
        <td style="background:#f8f6f2;border-top:1px solid #e8e4dc;padding:20px 40px;text-align:center;">
          <p style="margin:0 0 6px;font-size:12px;color:#7c728a;">This is an automated confirmation. Please do not reply to this email.</p>
          <p style="margin:0;font-size:11px;color:#b0a9bc;">© ' . date('Y') . ' EGC Ekora Global Consulting. All rights reserved.</p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>';
}
?>
