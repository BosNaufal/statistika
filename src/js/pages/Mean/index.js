
import React, { PropTypes } from 'react'

import angkaUtils from '../../utils/angka';

class Mean extends React.Component {

  constructor() {
    super();
    this.state = {
      deret: []
    }
  }

  handleChange(e) {
    const { value } = e.target
    const arrAngka = value.split(',')
    const removeNullMember = arrAngka.filter((angka) => {
      angka = parseFloat(angka)
      return angka
    })
    const realAngka = removeNullMember.map((item) => {
      item = parseFloat(item)
      return item
    })
    this.setState({ deret: realAngka })
  }

  render() {
    const { deret } = this.state
    const deretUrut = angkaUtils.sortByNumber(this.state.deret)
    const jumlahData = deretUrut.length
    const rataRata = deretUrut.length ? angkaUtils.hitungRataRata(deretUrut) : 0

    return (
      <div className="container">
        <h3>Do It!</h3>
        <textarea className="form-control" onChange={this.handleChange.bind(this)} placeholder="dipisah dengan tanda koma" />

        <div>
          <br />
          <b>Soal: </b>
          <span>{deret.join(", ")}</span>
          <br />

          <br />
          <b>Angka Urut: </b>
          <span>{deretUrut.join(", ")}</span>

          <br />
          <b>Jumlah Data: </b>
          <span>{jumlahData}</span>

          {rataRata > 0 &&
            <div>
              <br />
              <b>Rata-Rata: </b>
              <br />
              <span>
                = {deret.join(' + ')} / {jumlahData}
              </span>
              <br />
              <span>
                = {deret.reduce((a, v) => a + v)} / {jumlahData}
              </span>
              <br />
              <span> = {rataRata}</span>
            </div>
          }

          <br />
        </div>
      </div>
    );
  }


}

export default Mean;
