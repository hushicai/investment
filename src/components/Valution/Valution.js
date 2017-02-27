import React, {Component} from 'react';

class Valution extends Component {
  constructor (props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }
  onChange (e) {
    this.props.onChange({
      [e.target.name]: +e.target.value
    });
  }
  render () {
    const {
      earning,
      anchor,
      growth
    } = this.props;

    const pe = (year) => {
      return (anchor * Math.pow(1 + growth, year)).toFixed(2);
    };

    const reference = (
      Math.pow(1 + growth, 5) / Math.pow(1 + earning, 5) * anchor
    ).toFixed(2);

    return (
      <div>
        <div onChange={this.onChange}>
          <div>
            <label>预期投资收益率：</label>
            <input type="text" name="earning" defaultValue={earning} />
          </div>
          <div>
            <label>预期盈利增长率：</label>
            <input type="text" name="growth" defaultValue={growth} />
          </div>
          <div>
            <label>估值锚：</label>
            <input type="text" name="anchor" defaultValue={anchor} />
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>买入参考值</th>
              <th>估值锚（今年年初）</th>
              <th>第1年末</th>
              <th>第2年末</th>
              <th>第3年末</th>
              <th>第4年末</th>
              <th>第5年末</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{reference}</td>
              <td>{anchor}</td>
              <td>{pe(1)}</td>
              <td>{pe(2)}</td>
              <td>{pe(3)}</td>
              <td>{pe(4)}</td>
              <td>{pe(5)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Valution;
