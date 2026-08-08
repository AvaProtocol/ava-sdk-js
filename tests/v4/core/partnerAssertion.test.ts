import { generateKeyPairSync, verify, type KeyObject } from "node:crypto";

import {
  mintPartnerAssertion,
  partnerAssertionHeaders,
  PARTNER_ASSERTION_HEADER,
  PARTNER_SCOPE_READ,
} from "@avaprotocol/sdk-js";

function seedBase64FromGenerated(): {
  seedB64: string;
  publicKey: KeyObject;
} {
  const { privateKey, publicKey } = generateKeyPairSync("ed25519");
  const pkcs8 = privateKey.export({ type: "pkcs8", format: "der" }) as Buffer;
  // PKCS#8 for Ed25519 is 48 bytes: 16-byte prefix + 32-byte seed
  const seed = pkcs8.subarray(pkcs8.length - 32);
  return { seedB64: seed.toString("base64"), publicKey };
}

describe("mintPartnerAssertion", () => {
  it("produces a verifiable EdDSA JWT with read scope", () => {
    const { seedB64, publicKey } = seedBase64FromGenerated();
    const token = mintPartnerAssertion({
      privateKeyBase64: seedB64,
      partnerId: "studio",
      scope: PARTNER_SCOPE_READ,
      audience: "avs-gateway-local",
      expiresInSeconds: 300,
      issuedAt: 1_700_000_000,
    });

    const parts = token.split(".");
    expect(parts).toHaveLength(3);
    const [h, p, s] = parts;
    const header = JSON.parse(Buffer.from(h, "base64url").toString("utf8"));
    const payload = JSON.parse(Buffer.from(p, "base64url").toString("utf8"));
    expect(header).toEqual({ alg: "EdDSA", typ: "JWT" });
    expect(payload.iss).toBe("studio");
    expect(payload.scope).toBe("read");
    expect(payload.aud).toBe("avs-gateway-local");
    expect(payload.iat).toBe(1_700_000_000);
    expect(payload.exp).toBe(1_700_000_300);

    const ok = verify(
      null,
      Buffer.from(`${h}.${p}`, "utf8"),
      publicKey,
      Buffer.from(s, "base64url"),
    );
    expect(ok).toBe(true);
  });

  it("accepts ed25519: prefix and includes subject", () => {
    const { seedB64 } = seedBase64FromGenerated();
    const token = mintPartnerAssertion({
      privateKeyBase64: `ed25519:${seedB64}`,
      partnerId: "studio",
      scope: ["read"],
      subject: "0x1111111111111111111111111111111111111111",
    });
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64url").toString("utf8"),
    );
    expect(payload.sub).toBe("0x1111111111111111111111111111111111111111");
    expect(payload.scope).toBe("read");
  });

  it("rejects empty scope and overlong TTL", () => {
    const { seedB64 } = seedBase64FromGenerated();
    expect(() =>
      mintPartnerAssertion({
        privateKeyBase64: seedB64,
        partnerId: "studio",
        scope: "  ",
      }),
    ).toThrow(/scope/i);
    expect(() =>
      mintPartnerAssertion({
        privateKeyBase64: seedB64,
        partnerId: "studio",
        scope: "read",
        expiresInSeconds: 3601,
      }),
    ).toThrow(/3600/);
  });

  it("partnerAssertionHeaders sets the gateway header name", () => {
    const { seedB64 } = seedBase64FromGenerated();
    const headers = partnerAssertionHeaders({
      privateKeyBase64: seedB64,
      partnerId: "studio",
      scope: PARTNER_SCOPE_READ,
    });
    expect(Object.keys(headers)).toEqual([PARTNER_ASSERTION_HEADER]);
    expect(headers[PARTNER_ASSERTION_HEADER].split(".")).toHaveLength(3);
  });

  it("accepts base64-wrapped PEM (Studio GATEWAY_STUDIO_PARTNER_KEY format)", () => {
    const { privateKey } = generateKeyPairSync("ed25519");
    const pem = privateKey.export({ type: "pkcs8", format: "pem" }) as string;
    const pemB64 = Buffer.from(pem, "utf8").toString("base64");
    const token = mintPartnerAssertion({
      privateKeyBase64: pemB64,
      partnerId: "studio",
      scope: PARTNER_SCOPE_READ,
    });
    expect(token.split(".")).toHaveLength(3);
  });
});
