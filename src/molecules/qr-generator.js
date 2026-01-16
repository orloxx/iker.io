"use client";

import { faShareSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
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

  const searchParams = useSearchParams();

  const queryParams = useMemo(() => {
    return {
      text: searchParams.get("text") || "",
      ssid: searchParams.get("ssid") || "",
      password: searchParams.get("password") || "",
    };
  }, [searchParams.get]);

  const finalText = useMemo(() => {
    if (type === TYPES.wifi) {
      const ssid = SSIDText || queryParams.ssid;
      const passw = password || queryParams.password;
      return `WIFI:T:WPA;S:${ssid};P:${passw};;`;
    }
    return inputText || queryParams.text;
  }, [SSIDText, inputText, password, type, queryParams]);

  const toggleTypeLabel = useMemo(() => {
    return type === TYPES.text ? "Share WiFi" : "Share text";
  }, [type]);

  const toggleType = useCallback(() => {
    setInputText("");
    setSSIDText("");
    setPassword("");
    setType((prevType) => (prevType === TYPES.text ? TYPES.wifi : TYPES.text));
  }, []);

  const shareLink = useCallback(() => {
    const text = "Scan this QR code";
    const current = window.location.origin + window.location.pathname;
    const params = new URLSearchParams({
      text: inputText,
      ssid: SSIDText,
      password,
    });

    try {
      navigator.share({
        title: text,
        text,
        url: `${current}?${params.toString()}`,
      });
    } catch (e) {
      // Sharing not supported
      console.error("`navigator.share` not supported in this browser", e);
    }
  }, [SSIDText, inputText, password]);

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

  useEffect(() => {
    setType(queryParams.ssid ? TYPES.wifi : TYPES.text);
    setInputText(queryParams.text || "");
    setSSIDText(queryParams.ssid || "");
    setPassword(queryParams.password || "");
  }, [queryParams]);

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
          {toggleTypeLabel}
        </button>
        <button type="button" onClick={shareLink}>
          <FontAwesomeIcon icon={faShareSquare} /> Share Link
        </button>
      </div>
    </form>
  );
}

export default QRGenerator;
