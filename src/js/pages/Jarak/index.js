
import React, { PropTypes } from 'react'

import angkaUtils from '../../utils/angka';

class Jarak extends React.Component {

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
    const xmin = deretUrut[0]
    const xmax = deretUrut[deretUrut.length - 1]
    const R = xmax - xmin || 0
    const median = (jumlahData + 1) / 2

    return (
      <div className="container">
        <h1>Jarak Tunggal</h1>
        <p>Jangkauan sering disebut range atau rentang. Jangkauan dari suatu data didefinisikan sebagai selisih antara data terbesar dengan data terkecil. Disini kita simbolkan jangkauan dengan huruf R. Rumus umum jangkauan (<b>range</b>) :</p>
        <img src="./src/assets/img-content/jarak-tunggal.png" alt="rumus" style={{maxWidth: 250}} />
        <p>
          <br /> Keterangan :
          <br /> <b>R</b> = Jangkauan
          <br /> <b>Xmin</b> = Nilai / Data Terkecil.
          <br /> <b>Xmaks</b> = Nilai / Data Terbesar.
          Jarak terbagi menjadi jarak data tunggal dan jarak data kelompok.
        </p>

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
          <b>Xmin: </b>
          <span>{xmin}</span>

          <br />
          <b>Xmax: </b>
          <span>{xmax}</span>

          {R > 0 &&
            <div>
              <br />
              <b>R: </b>
              <span>{xmin} - {xmax} = {R}</span>
            </div>
          }

          {median > 0 &&
            <div>
              <br />
              <b>Median: </b>
              {jumlahData % 2 !== 0 ?
                <span>({jumlahData} + 1) / 2 = data ke-{median} ({deretUrut[median]})</span>
                : null
              }
            </div>
          }

          <br />
        </div>
      </div>
    );
  }


}

export default Jarak;
