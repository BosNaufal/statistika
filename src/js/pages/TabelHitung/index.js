
import React, { PropTypes } from 'react'

import angkaUtils from '../../utils/angka';

class TabelHitung extends React.Component {

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
      nilai: nilai.p0 || nilai.p1 ? nilai : data[i].nilai,
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


  hitungJumlahPerkalian() {
    const { data } = this.state
    let total = 0
    data.forEach((item, i) => {
      const hasil = item.nilai.p0 * item.nilai.pn
      total += hasil
    })
    return total
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
        <h1>Tabel Hitung</h1>

        <h3>Do It!</h3>
        <table className="table table-bordered text-center">
          <thead className="text-center">
            <tr>
              <th>x</th>
              <th>y</th>
              <th>x . y</th>
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

                <td>{ item.nilai.pn * item.nilai.p0 }</td>

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
              <td colSpan="2">Jumlah</td>
              <td>
                <span>{this.hitungJumlahPerkalian.bind(this)()}</span>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    );
  }


}

export default TabelHitung;
