insert into public.projects (slug,name,category,summary,tags,year,featured,live_url,published,sort_order,challenge,approach,outcome,highlights) values
('botshield','BotShield','Security · SaaS','Behavioral bot detection with cryptographic pass tokens. Zero CAPTCHA friction for real humans.',ARRAY['Next.js','Supabase','Edge']::text[],2026,true,'https://bo-tshield.vercel.app',true,1,'Bots were scraping checkout flows and inflating ad costs, while CAPTCHAs punished real customers.','Behavioral scoring plus cryptographic pass tokens at the edge, so genuine humans never see a challenge.','Bot traffic down 94%, checkout conversion up 11%, zero CAPTCHA complaints since launch.',ARRAY['Edge scoring under 5ms','Pass tokens replace CAPTCHA','Live analytics dashboard']::text[]),
('premium-joy','Premium Joy','E-commerce','Storefront with OTP checkout, live order tracking and admin broadcast tools.',ARRAY['Next.js','Supabase','Paystack']::text[],2026,true,null,true,2,'A growing storefront ran on manual order updates and broadcast emails that landed in spam.','Next.js storefront with OTP checkout, realtime order tracking and an admin broadcast center on Supabase.','Order support tickets down 60%, repeat purchases up 22% in the first quarter.',ARRAY['OTP checkout with Paystack','Realtime order tracking','Admin broadcast center']::text[]),
('founda-escrow','Founda Escrow','Fintech','Payment protection links: buyer pays, seller delivers, funds release on confirmation.',ARRAY['Next.js','Paystack','Webhooks']::text[],2026,false,null,true,3,null,null,null,null),
('bravehx-studio','BraveHX Studio','Brand · Web','Agency identity and web presence for Brave Hx Technology, graphics and design house.',ARRAY['Brand','Next.js']::text[],2025,false,null,true,4,null,null,null,null)
on conflict (slug) do nothing;

insert into public.founder (name,role,bio,tags)
select 'Mus''ab','Founder & Lead Engineer','Designer-turned-engineer building Founda Technologies from Lagos. Obsessed with craft, clarity, and shipping technology that solves real problems for African businesses and beyond.',ARRAY['Brand Identity','UI/UX Design','Next.js','Supabase','Prompt Engineering','Mentorship']::text[]
where not exists (select 1 from public.founder);

insert into public.settings (key,value) values
('name_expansion','"Foundation of Digital Africa"'::jsonb),
('description','"Founda is a technology company building digital solutions, products, and infrastructure to solve real problems and accelerate Africa''s digital future — especially Nigeria."'::jsonb),
('email','"hello@foundatech.name.ng"'::jsonb)
on conflict (key) do nothing;
