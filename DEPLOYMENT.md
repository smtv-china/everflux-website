# Everflux Website Deployment

## Local commands

```bash
npm install
npm run build
npm run start
```

For local development:

```bash
npm run dev -- -H 127.0.0.1
```

## Domain

Production domain:

```text
evererpower.com
www.evererpower.com
```

## Recommended deployment path A: Vercel

This is the fastest way to make the website public:

1. Push this project to GitHub.
2. Import `smtv-china/everflux-website` into Vercel.
3. Set the project root to this folder if the repository contains multiple projects.
4. Add custom domains in Vercel:
   - `evererpower.com`
   - `www.evererpower.com`
5. Vercel will show DNS records. Copy those records into Alibaba Cloud DNS.
6. Wait for DNS and HTTPS to become active.

Note: Vercel serverless file storage is not persistent. The current `/admin` upload feature is fine for demo/testing, but production uploads should move to Alibaba Cloud OSS.

## Recommended deployment path B: Alibaba Cloud ECS

Use this path if you want uploads and JSON inquiry data to persist on your own server.

On ECS:

```bash
git clone git@github.com:smtv-china/everflux-website.git
cd everflux-website
docker build -t everflux-website .
docker run -d \
  --name everflux-website \
  --restart unless-stopped \
  -p 3000:3000 \
  -v $(pwd)/data:/app/data \
  -v $(pwd)/uploads:/app/public/uploads \
  everflux-website
```

Then configure Nginx:

```nginx
server {
  listen 80;
  server_name evererpower.com www.evererpower.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

After Nginx works, add HTTPS with Alibaba Cloud SSL certificate or `certbot`.

## Alibaba Cloud DNS

In Alibaba Cloud DNS for `evererpower.com`, add:

If using Vercel:

- `@` CNAME: value shown by Vercel
- `www` CNAME: value shown by Vercel

If using ECS:

- `@` A: your ECS public IP
- `www` A: your ECS public IP

After DNS takes effect, test:

```text
https://evererpower.com/api/health
https://evererpower.com/sitemap.xml
https://evererpower.com/robots.txt
```

## Admin

The first version includes a simple admin page:

```text
/admin
```

It supports:

- Upload image/video files.
- Save external video links, news links, and case links.
- Review customer inquiries.

Important production note:

- The current JSON/file storage is suitable for the first release and testing.
- For serious production, move uploads to Alibaba Cloud OSS and data to MySQL, PostgreSQL, or Supabase.
- Add admin authentication before public promotion.

## SEO checklist

- Keep page title and description aligned with "Everflux 永流储能发电机".
- Publish real project cases at least twice per month.
- Use real product images, project videos, and client case pages.
- Add backlinks from LinkedIn, YouTube, Alibaba listings, industry directories, and partner websites.
- Submit sitemap to search engines.
- Add ICP filing if hosting in mainland China.
- Keep page speed high and images compressed.
