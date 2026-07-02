**Security Headers Implementation Guide**

**Website:** EGC Ekora Global Consulting  
**Technology:** React \+ Node.js Website

**Objective**

Implement essential security headers to improve website security, browser protection, and security scanner scores.

The following headers are currently missing:

1. Strict-Transport-Security (HSTS)

2. X-Frame-Options

3. X-Content-Type-Options

4. Referrer-Policy

5. Permissions-Policy

**Step 1: Identify the Server Type**

Before implementation, identify which backend setup is being used:

* Node.js \+ Express

* Node.js \+ Nginx

* Node.js \+ Apache

* Cloud Hosting (AWS, Vercel, etc.)

For most React \+ Node.js applications, the headers should be implemented on the **Node.js server** or **reverse proxy (Nginx)**.

**Option 1 (Recommended)**

**If Website Uses Express.js**

**Install Helmet Package**

npm install helmet

**Import Helmet**

Inside:

server.js

app.js

index.js

Add:

const helmet \= require('helmet');

**Enable Helmet**

app.use(helmet());

**Configure Required Security Headers**

app.use(

  helmet({

    frameguard: {

      action: 'sameorigin'

    },

    contentTypeOptions: true,

    referrerPolicy: {

      policy: 'strict-origin-when-cross-origin'

    }

  })

);

**Configure HSTS**

app.use(

  helmet.hsts({

    maxAge: 31536000,

    includeSubDomains: true,

    preload: true

  })

);

**Configure Permissions Policy**

app.use((req, res, next) \=\> {

  res.setHeader(

    'Permissions-Policy',

    'camera=(), microphone=(), geolocation=()'

  );

  next();

});

**Final Headers Generated**

Strict-Transport-Security:

max-age=31536000; includeSubDomains; preload

X-Frame-Options:

SAMEORIGIN

X-Content-Type-Options:

nosniff

Referrer-Policy:

strict-origin-when-cross-origin

Permissions-Policy:

camera=(), microphone=(), geolocation=()

**Step 2: Restart Server**

npm restart

or

pm2 restart all

**Step 3: Verify Headers**

Open:

[https://securityheaders.com/](https://securityheaders.com/)

Enter:

https://www.ekoraglobalconsulting.com

Expected result:

A or A+ Security Grade

**Option 2**

**If Website Uses Nginx**

Open:

/etc/nginx/nginx.conf

or

/etc/nginx/sites-available/default

Inside:

server {

Add:

add\_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

add\_header X-Frame-Options "SAMEORIGIN" always;

add\_header X-Content-Type-Options "nosniff" always;

add\_header Referrer-Policy "strict-origin-when-cross-origin" always;

add\_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;

**Validate Configuration**

sudo nginx \-t

**Restart Nginx**

sudo systemctl reload nginx

**Step 4: Verify Again**

Visit:

[https://securityheaders.com/](https://securityheaders.com/)

The following headers should now appear:

✅ Strict-Transport-Security  
✅ X-Frame-Options  
✅ X-Content-Type-Options  
✅ Referrer-Policy  
✅ Permissions-Policy

**Important Notes**

**Do NOT implement these in React frontend files:**

❌ App.js  
❌ index.jsx  
❌ Head components  
❌ Meta tags

Security headers must be implemented at:

✅ Node.js Server  
✅ Express Server  
✅ Nginx  
✅ Apache

**Recommended Headers for EGC**

| Header | Value |
| :---- | :---- |
| Strict-Transport-Security | max-age=31536000; includeSubDomains; preload |
| X-Frame-Options | SAMEORIGIN |
| X-Content-Type-Options | Nosniff |
| Referrer-Policy | strict-origin-when-cross-origin |
| Permissions-Policy | camera=(), microphone=(), geolocation=() |

**Deliverable for Developer**

**Task:** Implement the five security headers on the server side and verify them using:

[https://securityheaders.com/](https://securityheaders.com/)

No frontend changes are required.

