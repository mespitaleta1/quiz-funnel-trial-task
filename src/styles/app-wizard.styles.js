export const APP_WIZARD_STYLES = `
:host {
    display: block;
    color: #252525;
    font-family: "DM Sans", sans-serif;
    padding: 50px 10%;
  }

  .wizard {
    max-width: 640px;
    margin: 0 auto;
    padding: 24px;
    border-radius: 16px;
    border: 1px solid #ddd;
    background: white;
  }

  .progress {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 32px;
    position: relative;
  }

  .progress-label {
    font-size: 14px;
    color: #666;
  }

  .progress-bar {
    width: 100%;
    height: 8px;
    background: #ececec;
    border-radius: 999px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: #40a3b5;
    transition: width .3s ease;
    border-radius: 5px;
  }

  .progress svg{
    top: 16px;
    position: absolute;
    right: -8px;
    width: 34px;
    height: 34px;
}

  .content {
    margin-bottom: 32px;
  }

  .actions {
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }

  button {
    padding: 12px 18px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
  }

  button:disabled {
    opacity: .4;
    cursor: not-allowed;
  }

  .secondary {
    background: #efefef;
  }

  .primary {
    background: #40a3b5;
    color: white;
  }

  .primary:hover{
    background:#4D468C;
  }`;