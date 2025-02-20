export default async function handler(req, res) {
  // Chỉ cho phép phương thức POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Cấu hình thông tin API của SpeechAce
  const API_KEY = "kzsoOXHxN1oTpzvi85wVqqZ9Mqg6cAwmHhiTvv%2FfcvLKGaWgcsQkEivJ4D%2Bt9StzW1YpCgrZp8DsFSfEy3YApSRDshFr4FlY0gyQwJOa6bAVpzh6NnoVQC50w7m%2FYYHA";
  const USER_ID = "XYZ-ABC-99001";  // Bạn có thể đặt giá trị tuỳ ý
  const DIALECT = "en-us";
  const API_URL = `https://api.speechace.co/api/scoring/text/v9/json?key=${API_KEY}&dialect=${DIALECT}&user_id=${USER_ID}`;

  try {
    // Nhận payload từ client
    const { text, audio_data } = req.body;

    if (!text || !audio_data) {
      return res.status(400).json({ message: 'Thiếu thông tin: text hoặc audio_data' });
    }

    // Chuẩn bị payload cho SpeechAce API
    const payload = {
      text,
      audio_data
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      // Lấy thêm thông tin lỗi từ response nếu có
      const errorText = await response.text();
      return res.status(response.status).json({ message: errorText });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Lỗi trong serverless function:", error);
    return res.status(500).json({ message: error.message });
  }
}
