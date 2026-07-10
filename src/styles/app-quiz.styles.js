export const APP_QUIZ_STYLES = `
:host {
    display: block;
    font-family: system-ui, sans-serif;
    background-image: linear-gradient(6deg,#f0ead3 0%,#ecf8ff 100.12%);
    min-height:100vh;
  }

  .options {
    display: grid;
    gap: 12px;
  }

  .option {
    width: 100%;
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 12px;
    background: white;
    text-align: left;
    cursor: pointer;
  }

  .option.selected {
    border-color: #40a3b5;
    background: #daf0f5;
    font-weight: 700;
  }

  label {
    display: grid;
    gap: 6px;
    margin-bottom: 16px;
  }

  input {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font: inherit;
  }

  p{
    color:#666;
    margin-bottom:40px;
  }

  .error {
    color: #dc3545;
    font-size: 0.85rem;
    display: block;
    margin-top: 2px;
    font-weight: 600;
  }

  input.error {
    border: 1px solid #dc3545;
  }

  input.error:focus {
    outline: none;
    border-color: #dc3545;
  }
`;
