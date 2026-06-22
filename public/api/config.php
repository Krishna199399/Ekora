<?php
// EGC - PHP Mailer configuration file for Hostinger Shared Hosting

// ─── SMTP Credentials ─────────────────────────────────────
// Define these here or in Hostinger environment settings.
// For security, you can edit these values directly below:
define('SMTP_HOST', 'smtp.hostinger.com');
define('SMTP_PORT', 465); // SSL port
define('SMTP_USER', 'info@ekoraglobalconsulting.com'); // Put your SMTP email here
define('SMTP_PASS', 'Ekora@2026');                     // Put your SMTP password here
define('CONTACT_EMAIL', 'info@ekoraglobalconsulting.com'); // Lead notification destination

// ─── Email Display Settings ───────────────────────────────
define('SENDER_NAME', 'EGC Ekora Global Consulting');
define('ADMIN_SUBJECT_PREFIX', '🔔 New Lead: ');
define('AUTO_REPLY_SUBJECT', 'We received your inquiry — EGC Ekora Global Consulting');
?>
