import './Landing.css';

function Setup() {
  return (
    <div className="Landing">
      <div>
        <h2>Set Up Your Game</h2>
        <table align="left">
          <tr>
            <th>Timer</th>
          </tr>
          <tr>
            <td>10s</td>
            <td>15s</td>
            <td>30s</td>
            <td>60s</td>
            <td>
              Custom <input type="number" name="name" />
            </td>
          </tr>
          <tr>
            <td>Max Players: <input type="number" name="name"/></td>
          </tr>
          <tr>
            <button>Start</button>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Setup;
