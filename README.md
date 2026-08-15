# Mira Welfare Foundation — Website

A React + Tailwind site (Vite build). This folder is a complete, deployable project.

## Run locally
```
npm install
npm run dev
```

## Deploy with a real domain (fastest path — free tier works)

**1. Put this code on GitHub**
- Create a new repo, push this folder to it.

**2. Deploy to Vercel or Netlify**
- Go to vercel.com or netlify.com, sign up, choose "Import Git Repository," pick your repo.
- Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.
- Click deploy — you'll get a free `*.vercel.app` or `*.netlify.app` URL in about a minute.

**3. Buy a domain**
- Register one at Namecheap, GoDaddy, Google Domains successor (Squarespace Domains), or Cloudflare Registrar.
- `.com` or `.org` both work fine for an NGO; `.org` reads slightly more nonprofit-coded.

**4. Connect the domain**
- In Vercel/Netlify project settings, go to "Domains," add your domain.
- They'll give you DNS records (usually an A record + CNAME) to add at your domain registrar.
- Add those records in the registrar's DNS panel. Propagation usually takes minutes to a few hours.

That's it — no server to manage, free hosting tier is enough for a site like this, and HTTPS is automatic.
