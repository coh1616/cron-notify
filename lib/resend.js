import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function formatTimestamp(timestamp) {
  return new Intl.DateTimeFormat("zh-TW", {
    dateStyle: "long",
    timeStyle: "medium",
    timeZone: "Asia/Taipei",
  }).format(timestamp);
}

function buildEmailHtml(timestamp) {
  return `
    <div style="background-color:#f4f4f5;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
        <tr>
          <td style="background-color:#171717;padding:32px 40px;text-align:center;">
            <span style="font-size:32px;">🎉</span>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:700;">恭喜你!</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 40px;">
            <p style="margin:0 0 16px;color:#111827;font-size:16px;line-height:1.7;">
              你已經快把課程裡所有的積木都學完了!從最基礎的元件,到現在可以自己動手串接 API、資料庫和寄信服務,一步一步把它們組合成完整的功能 —— 這段學習歷程真的很扎實。
            </p>
            <p style="margin:0 0 24px;color:#111827;font-size:16px;line-height:1.7;">
              繼續保持這個節奏,很快就能把最後幾塊積木也拼上,完成整個作品!
            </p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;border-radius:10px;">
              <tr>
                <td style="padding:16px 20px;color:#6b7280;font-size:13px;">
                  觸發時間<br />
                  <span style="color:#111827;font-size:15px;font-weight:600;">${formatTimestamp(timestamp)}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 40px 32px;text-align:center;color:#9ca3af;font-size:12px;">
            此信由 cron-notify-practice 的 /api/ping 自動觸發寄出
          </td>
        </tr>
      </table>
    </div>
  `;
}

export async function sendPingNotification(timestamp) {
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "coh1616@gmail.com",
    subject: "🎉 恭喜!你的課程積木快要全部完成了",
    html: buildEmailHtml(timestamp),
  });

  if (error) {
    throw new Error(`Resend failed to send email: ${error.message}`);
  }

  return data;
}
