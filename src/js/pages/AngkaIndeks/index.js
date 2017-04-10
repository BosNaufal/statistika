
import React, { PropTypes } from 'react'

import angkaUtils from '../../utils/angka';

class AngkaIndeks extends React.Component {

  constructor() {
    super();
    this.state = {
      nilai: {},
      frekuensi: 0,
      data: [
        // {
        //   nilai: { p0: 60, pn: 62 },
        //   frekuensi: 10
        // },
        // {
        //   nilai: { p0: 63, pn: 65 },
        //   frekuensi: 25
        // },
        // {
        //   nilai: { p0: 66, pn: 68 },
        //   frekuensi: 32
        // },
        // {
        //   nilai: { p0: 69, pn: 71 },
        //   frekuensi: 15
        // },
        // {
        //   nilai: { p0: 72, pn: 74 },
        //   frekuensi: 18
        // },
      ]
    }
  }

  clearPrimaryInput() {
    this.inputNilaiP0.value = ""
    this.inputNilaiPn.value = ""
    this.inputFrekuensi.value = ""
  }

  handleChangeNilai(name, e) {
    const { value } = e.target
    const nilai = this.state.nilai
    nilai[name] = parseFloat(value)
    this.setState({ nilai })
  }

  handleChangeNilaiEdit(name, i, e) {
    const { value } = e.target
    const { data } = this.state
    const nilai = JSON.parse(JSON.stringify(data[i]))
    nilai.nilai[name] = parseFloat(value)
    this.setState({ nilai: {...nilai.nilai} })
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
      nilai: nilai.p0 ? nilai : data[i].nilai,
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

  hitungP0W(i) {
    const { data } = this.state
    const { nilai: {p0}, frekuensi } = data[i]
    return angkaUtils.bulatkan(p0 * frekuensi)
  }

  hitungPnW(i) {
    const { data } = this.state
    const { nilai: {pn}, frekuensi } = data[i]
    return angkaUtils.bulatkan(pn * frekuensi)
  }

  hitungJumlahPW(name) {
    const { data } = this.state
    let total = 0
    data.forEach((item, i) => {
      const hasil = item.nilai[name] * item.frekuensi
      total += hasil
    })
    return total
  }

  hitungJumlahPnW() {

  }

  render() {
    const { data } = this.state
    const dataTerbesar = data[data.length - 1]
    const dataTerKecil = data[0]
    const p0 = data.length ? (dataTerKecil.nilai.p0 +  dataTerKecil.nilai.pn) / 2 : 0
    const pn = data.length ? (dataTerbesar.nilai.p0 +  dataTerbesar.nilai.pn) / 2 : 0
    const R = data.length ? pn - p0 : 0;

    return (
      <div className="container">
        <h1>AngkaIndeks Agregratif Sederhana</h1>

        <h3>Do It!</h3>
        <table className="table table-bordered text-center">
          <thead className="text-center">
            <tr>
              <th>W</th>
              <th>P0</th>
              <th>Pn</th>
              <th>P0 . W</th>
              <th>Pn . W</th>
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
                      onChange={this.handleChangeFrekuensi.bind(this)}
                      defaultValue={item.frekuensi}
                    />
                    :
                    <span>{item.frekuensi}</span>
                  }
                </td>

                <td>
                  {item.isEditMode ?
                    <input
                      type="text"
                      className="form-control"
                      onChange={this.handleChangeNilaiEdit.bind(this, 'p0', i)}
                      defaultValue={item.nilai.p0}
                    />
                    :
                    <span>{item.nilai.p0}</span>
                  }
                </td>

                <td>
                  {item.isEditMode ?
                    <input
                      type="text"
                      className="form-control"
                      onChange={this.handleChangeNilaiEdit.bind(this, 'pn', i)}
                      defaultValue={item.nilai.pn}
                    />
                    :
                    <span>{item.nilai.pn}</span>
                  }
                </td>

                <td>{this.hitungP0W(i)}</td>
                <td>{this.hitungPnW(i)}</td>
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
                  onChange={this.handleChangeFrekuensi.bind(this)}
                  ref={(e) => this.inputFrekuensi = e }/>
              </td>
              <td>
                <input type="text"
                  className="form-control"
                  onChange={this.handleChangeNilai.bind(this, 'p0')}
                  ref={(e) => this.inputNilaiP0 = e }/>
              </td>
              <td>
                <input type="text"
                  className="form-control"
                  onChange={this.handleChangeNilai.bind(this, 'pn')}
                  ref={(e) => this.inputNilaiPn = e }/>
              </td>

              <td colSpan="3">
                <button className="btn" onClick={this.handleAddData.bind(this)}>Add</button>
              </td>
            </tr>
            <tr>
              <td colSpan="3">Jumlah</td>
              <td>
                <span>{this.hitungJumlahPW.bind(this)("p0")}</span>
              </td>
              <td>
                <span>{this.hitungJumlahPW.bind(this)("pn")}</span>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    );
  }


}

export default AngkaIndeks;
