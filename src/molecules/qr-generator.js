"use client";

import Image from "next/image";
import QRCode from "qrcode";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "styles/modules/qr-generator.module.scss";

const TYPES = {
  text: "text",
  wifi: "wifi",
};

function QRGenerator() {
  const [type, setType] = useState(TYPES.text);
  const [inputText, setInputText] = useState("");
  const [SSIDText, setSSIDText] = useState("");
  const [password, setPassword] = useState("");
  const [encodedImage, setEncodedImage] = useState("");

  const finalText = useMemo(() => {
    if (type === TYPES.wifi) {
      return `WIFI:T:WPA;S:${SSIDText};P:${password};;`;
    }
    return inputText;
  }, [SSIDText, inputText, password, type]);

  const toggleType = useCallback(() => {
    setType((prevType) => (prevType === TYPES.text ? TYPES.wifi : TYPES.text));
  }, []);

  const generateQR = useCallback(async () => {
    try {
      const imageData = await QRCode.toDataURL(finalText || "EMPTY");

      setEncodedImage(imageData);
    } catch (_) {
      setEncodedImage("");
    }
  }, [finalText]);

  useEffect(() => {
    generateQR();
  }, [generateQR]);

  return (
    <form className={styles.form}>
      {!!encodedImage && (
        <Image
          className={styles.image}
          src={encodedImage}
          alt="QR Code"
          width={400}
          height={400}
        />
      )}
      {type === TYPES.text && (
        <label className={styles.label} htmlFor="text-to-encode">
          <p>Plain text</p>
          <input
            id="text-to-encode"
            type="text"
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
            placeholder="https://example.com"
            maxLength={1000}
          />
        </label>
      )}
      {type === TYPES.wifi && (
        <>
          <label className={styles.label} htmlFor="text-ssid">
            <p>SSID</p>
            <input
              id="text-ssid"
              type="text"
              onChange={(e) => setSSIDText(e.target.value)}
              value={SSIDText}
              placeholder="Your WiFi SSID"
              maxLength={1000}
            />
          </label>
          <label className={styles.label} htmlFor="text-password">
            <p>Password</p>
            <input
              id="text-password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Your WiFi Password"
              maxLength={1000}
            />
          </label>
        </>
      )}
      <div className={styles.buttons}>
        <button type="button" onClick={toggleType}>
          Toggle type
        </button>
      </div>
    </form>
  );
}

export default QRGenerator;
