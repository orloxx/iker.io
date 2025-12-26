import Desktop from "molecules/desktop";
import QRGenerator from "molecules/qr-generator";
import Window from "molecules/window";

export default function QRPage() {
  return (
    <>
      <Desktop />
      <Window title="QR Create">
        <QRGenerator />
      </Window>
    </>
  );
}
