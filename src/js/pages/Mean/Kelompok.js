
import React, { PropTypes } from 'react'

import angkaUtils from '../../utils/angka';
class Simpangan extends React.Component {

  constructor() {
    super();
    this.state = {
      nilai: {},
      frekuensi: 0,
      data: [
        // {
        //   nilai: { xmin: 60, xmax: 62 },
        //   frekuensi: 10
        // },
        // {
        //   nilai: { xmin: 63, xmax: 65 },
        //   frekuensi: 25
        // },
        // {
        //   nilai: { xmin: 66, xmax: 68 },
        //   frekuensi: 32
        // },
        // {
        //   nilai: { xmin: 69, xmax: 71 },
        //   frekuensi: 15
        // },
        // {
        //   nilai: { xmin: 72, xmax: 74 },
        //   frekuensi: 18
        // },
      ]
    }
  }

  clearPrimaryInput() {
    this.inputNilai.value = ""
    this.inputFrekuensi.value = ""
  }

  handleChangeNilai(e) {
    const { value } = e.target
    const nilai = angkaUtils.pisahByDash(value)
    this.setState({ nilai })
  }

  handleChangeFrekuensi(e) {
    const { value } = e.target
    const frekuensi = parseFloat(value)
    this.setState({ frekuensi })
  }

  handleAddData() {
    const { nilai, frekuensi, data } = this.state
    const item = {
      nilai,
      frekuensi
    }
    data.push(item)
    this.setState({ data, nilai: {}, frekuensi: 0 })
    this.clearPrimaryInput()
  }

  handleEditItem(i) {
    const { data } = this.state
    data[i].isEditMode = true
    this.setState({ data })
    this.clearPrimaryInput()
  }

  handleDoneEditItem(i) {
    const { nilai, frekuensi, data } = this.state
    const newData = {
      nilai: nilai.xmin ? nilai : data[i].nilai,
      frekuensi: frekuensi || data[i].frekuensi
    }
    data[i] = newData
    data[i].isEditMode = false
    this.setState({ data, nilai: {}, frekuensi: 0 })
  }

  handleRemoveItem(i) {
    const { data } = this.state
    data.splice(i, 1)
    this.setState({ data })
  }

  hitungNilaiTengah(i) {
    const { data } = this.state
    const { nilai: { xmin, xmax } } = data[i]
    let nilaiTengah = (xmin + xmax) / 2
    nilaiTengah = parseFloat(nilaiTengah.toFixed(2))
    return nilaiTengah
  }

  hitungXBar() {
    const { data } = this.state

    const atasToSum = []
    const atasText = []
    const frekuensiToSum = []
    data.forEach((item, i) => {
      const atas = this.hitungNilaiTengah.bind(this, i)() * item.frekuensi
      // console.log(`${this.hitungNilaiTengah.bind(this, i)()}(${item.frekuensi}) = ${atas}`);
      atasText.push(`${this.hitungNilaiTengah.bind(this, i)()}(${item.frekuensi})`);
      atasToSum.push(atas)
      frekuensiToSum.push(item.frekuensi)
    })
    const sigmaAtas = angkaUtils.sigmaArray(atasToSum)
    const sigmaFrekuensi = angkaUtils.sigmaArray(frekuensiToSum)
    let xbar = sigmaAtas / sigmaFrekuensi
    xbar = parseFloat(xbar.toFixed(2))
    return [xbar, atasText, atasToSum, frekuensiToSum]
  }

  hitungFiXi(i) {
    const { data } = this.state
    const { frekuensi } = data[i]
    const hasil = angkaUtils.bulatkan(this.hitungNilaiTengah(i) * frekuensi)
    return hasil
  }

  hitungSimpanganRataRata() {
    const { data } = this.state
    const jumlahData = data.length
    const [xbar] = this.hitungXBar.bind(this)()
    const arrayToSum = []
    const cara1 = []
    const cara2 = []
    const cara3 = []
    const frekuensiCara = []
    data.forEach((item, i) => {
      const jumlah = this.hitungFiXiXbar.bind(this)(i)
      const jumlahMutlak = angkaUtils.bulatkan(angkaUtils.nilaiMutlak(jumlah))
      arrayToSum.push(jumlahMutlak)

      cara1.push(`${item.frekuensi}|${this.hitungNilaiTengah.bind(this)(i)} - ${xbar}|`)
      cara2.push(`${item.frekuensi}(${this.hitungXiXbar.bind(this)(i)})`)
      cara3.push(`${item.frekuensi * this.hitungXiXbar.bind(this)(i)}`)
      frekuensiCara.push(item.frekuensi)
    })
    const sigmaArray = angkaUtils.bulatkan(angkaUtils.sigmaArray(arrayToSum))
    let simpanganRataRata = sigmaArray / angkaUtils.bulatkan(angkaUtils.sigmaArray(frekuensiCara))

    simpanganRataRata = parseFloat(simpanganRataRata.toFixed(2))
    return [simpanganRataRata, cara1.join(" + "), cara2.join(" + "), cara3.join(" + "), frekuensiCara, sigmaArray]
  }

  render() {
    const { data } = this.state
    const [xbar, xbarAtasText, xbarAtasToSum, xbarFrekuensiToSum] = data.length ? this.hitungXBar.bind(this)() : [0,[],[],[]]

    return (
      <div className="container">
        <h1>Mean Data Kelompok</h1>
        <h3>Do It!</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Nilai</th>
              <th>Frekuensi</th>
              <th>Tengah</th>
              <th>Fi.Xi</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {this.state.data.map((item, i) => (
              <tr key={i}>
                <td>
                  {item.isEditMode ?
                    <input
                      type="text"
                      className="form-control"
                      onChange={this.handleChangeNilai.bind(this)}
                      defaultValue={`${item.nilai.xmin} - ${item.nilai.xmax}`}
                    />
                    :
                    <span>{item.nilai.xmin} - {item.nilai.xmax}</span>
                  }
                </td>

                <td>
                  {item.isEditMode ?
                    <input
                      type="text"
                      className="form-control"
                      onChange={this.handleChangeFrekuensi.bind(this)}
                      defaultValue={item.frekuensi}
                    />
                    :
                    <span>{item.frekuensi}</span>
                  }
                </td>

                <td>{this.hitungNilaiTengah(i)}</td>
                <td>{this.hitungFiXi(i)}</td>

                <td>
                  {item.isEditMode ?
                    <button className="btn" onClick={this.handleDoneEditItem.bind(this, i)}>Done</button>
                    : <button className="btn" onClick={this.handleEditItem.bind(this, i)}>Edit</button>
                  }
                  <button className="btn" onClick={this.handleRemoveItem.bind(this, i)}>Remove</button>
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <input type="text"
                  className="form-control"
                  onChange={this.handleChangeNilai.bind(this)}
                  ref={(e) => this.inputNilai = e }/>
              </td>
              <td>
                <input type="text"
                  className="form-control"
                  onChange={this.handleChangeFrekuensi.bind(this)}
                  ref={(e) => this.inputFrekuensi = e }/>
              </td>
              <td colSpan="5">
                <button className="btn" onClick={this.handleAddData.bind(this)}>Add</button>
              </td>
            </tr>
          </tbody>
        </table>

        { data.length &&
          <div>
            <br />
            <b>Xbar: </b>
            <br />
            <span>
              = ({ xbarAtasText.map((item,i) => {
                return i < xbarAtasText.length - 1 ? item + " + " : item
              }) })
              /
              ({ xbarFrekuensiToSum.map((item,i) => {
                return i < xbarFrekuensiToSum.length - 1 ? item + " + " : item
              }) })
            </span>
            <br />
            <span>
              = ({ xbarAtasToSum.map((item,i) => {
                return i < xbarAtasToSum.length - 1 ? item + " + " : item
              }) })
              / {angkaUtils.sigmaArray(xbarFrekuensiToSum)}
            </span>
            <br />
            <span>
              = {angkaUtils.sigmaArray(xbarAtasToSum)}
              / {angkaUtils.sigmaArray(xbarFrekuensiToSum)}
            </span>
            <br />
            <span>
              = {xbar}
            </span>
            <br />
          </div>
        }

      </div>
    );
  }

}

export default Simpangan;
