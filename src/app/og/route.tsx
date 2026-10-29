import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { plans } from "@/content/site";

// Draws the share card for WhatsApp, iMessage, LinkedIn and X: the photo, the headline, one line
// and the logos. The site serves a JPEG copy, public/og.jpg, because WhatsApp drops previews over
// about 300 KB. After changing this card, open /og and save it over public/og.jpg as a JPEG.
const size = { width: 1200, height: 630 };

const root = process.cwd();
const file = (p: string) => readFile(join(root, p));
const dataUri = async (p: string, type: string) => `data:${type};base64,${(await file(p)).toString("base64")}`;

export async function GET() {
  const [light, bold, body, photo, ...marks] = await Promise.all([
    file("src/assets/og-fonts/geist-latin-300-normal.woff"),
    file("src/assets/og-fonts/geist-latin-700-normal.woff"),
    file("src/assets/og-fonts/inter-latin-400-normal.woff"),
    dataUri("public/chris-knight.jpg", "image/jpeg"),
    dataUri("public/clients/snapchat.svg", "image/svg+xml"),
    dataUri("public/clients/nike.svg", "image/svg+xml"),
    dataUri("public/clients/google.svg", "image/svg+xml"),
    dataUri("public/clients/manchester-city.png", "image/png"),
    dataUri("public/logos/google.svg", "image/svg+xml"),
    dataUri("public/logos/openai.svg", "image/svg+xml"),
    dataUri("public/logos/claude.svg", "image/svg+xml"),
    dataUri("public/logos/gemini.svg", "image/svg+xml"),
    dataUri("public/logos/perplexity.svg", "image/svg+xml"),
    dataUri("public/logos/copilot.svg", "image/svg+xml"),
    dataUri("public/logos/grok.svg", "image/svg+xml"),
  ]);
  const brands = marks.slice(0, 4);
  const platforms = marks.slice(4);
  const [build, care] = plans;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#FDFCFC", fontFamily: "Inter" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt="" width={440} height={630} style={{ objectFit: "cover", objectPosition: "50% 20%" }} />
        <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "56px 64px 48px" }}>
          <div style={{ fontFamily: "Geist", fontWeight: 700, fontSize: 30, letterSpacing: -0.6 }}>Chris Knight</div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 44, fontFamily: "Geist", fontWeight: 300, fontSize: 76, lineHeight: 1.04, letterSpacing: -2 }}>
            <span>Websites that</span>
            <span>make you money</span>
          </div>
          <div style={{ marginTop: 24, fontSize: 25, lineHeight: 1.4, color: "#4E4E4E" }}>
            {`Live in 24 hours. Found on Google, recommended by AI. From £${build.price}, then £${care.price} a month.`}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: "auto" }}>
            {brands.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={src} alt="" width={i === 1 ? 56 : 36} height={36} style={{ objectFit: "contain", opacity: 0.55 }} />
            ))}
            <div style={{ width: 1, height: 36, background: "#E5E5E5" }} />
            {platforms.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={src} alt="" width={24} height={24} style={{ objectFit: "contain" }} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, fontSize: 20, color: "#777169" }}>
            <span>mrcjk.com</span>
            <span>Websites · SEO · AEO · AI</span>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 10,
            background: "linear-gradient(90deg, #8e93c9, #b98bb0, #df6a63, #f39a4c)",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: light, weight: 300, style: "normal" },
        { name: "Geist", data: bold, weight: 700, style: "normal" },
        { name: "Inter", data: body, weight: 400, style: "normal" },
      ],
    },
  );
}
