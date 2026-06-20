import axios from 'axios';

export async function getMenuItems() {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api/cardapio`
  );

  return response.data;
}

export async function addMenuItem(formData, token) {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api/cardapio`,
    formData,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}