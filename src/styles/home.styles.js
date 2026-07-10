export const HOME_STYLES = `
:host {
    display:flex;
    justify-content:center;
    align-items:center;
    min-height:100vh;
    font-family:DM Sans,sans-serif;
    background-image: linear-gradient(6deg,#f0ead3 0%,#ecf8ff 100.12%);
  }

  .container {
    text-align:center;
    max-width:600px;
  }

  h1 {
    font-size:40px;
    margin-bottom:16px;
  }

  p {
    color:#666;
    margin-bottom:40px;
  }

  button {
    padding:14px 28px;
    border:none;
    border-radius:8px;
    background:#40A3B5;
    color:white;
    cursor:pointer;
    font-size:18px;
  }

  button:hover {
    background:#4D468C;
  }`;