import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "4tune.labs — Studio Rekayasa Software & Servis Hardware PC";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#F7F5EF",
          padding: "48px 56px",
          fontFamily: "sans-serif",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        {/* Left Column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "590px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              backgroundColor: "#ECE5D5",
              borderRadius: "6px",
              alignSelf: "flex-start",
              marginBottom: "16px",
              fontSize: "12px",
              fontWeight: 700,
              color: "#6A5C41",
              letterSpacing: "0.08em",
            }}
          >
            <span>STUDIO REKAYASA & TECH SUPPORT</span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "46px",
              fontWeight: 800,
              marginBottom: "12px",
            }}
          >
            <span style={{ color: "#D99516" }}>4</span>
            <span style={{ color: "#181A1E" }}>tune</span>
            <span style={{ color: "#2D8357" }}>.labs</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "44px",
              fontWeight: 800,
              color: "#181A1E",
              lineHeight: 1.15,
              marginBottom: "20px",
            }}
          >
            <span>Dari kode web</span>
            <span>hingga hardware,</span>
            <span style={{ color: "#2D8357" }}>beres tanpa perantara.</span>
          </div>

          <p
            style={{
              fontSize: "18px",
              color: "#555A64",
              lineHeight: 1.5,
              margin: 0,
              marginBottom: "24px",
            }}
          >
            Studio rekayasa independen oleh 4 engineer mahasiswa. Servis Laptop/PC, Reparasi Smartphone, & Web Studio Modern.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                border: "1px solid #E2DDD2",
                fontSize: "14px",
                color: "#181A1E",
              }}
            >
              <strong style={{ marginRight: "8px", color: "#2D8357" }}>Zero Middleman</strong>
              <span style={{ color: "#555A64" }}>• Diagnosa Transparan & Bergaransi</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
                backgroundColor: "#FDF6E2",
                borderRadius: "8px",
                border: "1px solid #F3DB9E",
                fontSize: "14px",
                color: "#8E6510",
              }}
            >
              <strong style={{ marginRight: "8px", color: "#8E6510" }}>Lab Fisik:</strong>
              <span>Asrama SCWE Gedung 2 Lt. 3 Kamar 304</span>
            </div>
          </div>
        </div>

        {/* Right Column Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "480px",
            height: "534px",
            backgroundColor: "#1A1D22",
            borderRadius: "18px",
            padding: "28px",
            border: "2px solid #2F353E",
            boxSizing: "border-box",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: "20px",
                fontWeight: 800,
                color: "#FFFFFF",
                marginBottom: "4px",
              }}
            >
              LAYANAN & SPESIALISASI
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "#9BA3AF",
                marginBottom: "20px",
              }}
            >
              Dikerjakan langsung oleh engineer penanggung jawab
            </div>

            {/* Item 1 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#23272F",
                border: "1px solid #3A404D",
                borderRadius: "12px",
                padding: "14px 18px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#F7F5EF",
                  marginBottom: "4px",
                }}
              >
                1. Hardware Laptop & PC
              </div>
              <div style={{ fontSize: "13px", color: "#BAC3CE" }}>
                Upgrade SSD NVMe, Tambah RAM, Deep Cleaning heatsink & repasta.
              </div>
            </div>

            {/* Item 2 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#23272F",
                border: "1px solid #3A404D",
                borderRadius: "12px",
                padding: "14px 18px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#F7F5EF",
                  marginBottom: "4px",
                }}
              >
                2. Reparasi Smartphone & HP
              </div>
              <div style={{ fontSize: "13px", color: "#BAC3CE" }}>
                Ganti LCD, Modul Kamera, Port Cas, Baterai, & HP Matot VPH_PWR.
              </div>
            </div>

            {/* Item 3 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#23272F",
                border: "1px solid #3A404D",
                borderRadius: "12px",
                padding: "14px 18px",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#F7F5EF",
                  marginBottom: "4px",
                }}
              >
                3. Web Studio & Solusi AI
              </div>
              <div style={{ fontSize: "13px", color: "#BAC3CE" }}>
                Website UMKM, Landing Page Cepat, Portofolio, & Aplikasi Next.js.
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "15px",
              color: "#E4A932",
              fontFamily: "monospace",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#3D9B63",
              }}
            />
            <span>Kalkulator Biaya Live di 4tunelabs.vercel.app</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
