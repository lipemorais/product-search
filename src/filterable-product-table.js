import React, { Component } from 'react'

class SearchBar extends React.Component{
  constructor (props) {
    super()
    this.handleFilterByChange = this.handleFilterByChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterByChange(e) {
    this.props.onFilterByChange(e.target.value)
  }

  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked)
  }

  render() {
    const { filterBy, inStockOnly } = this.props

    return(
      <div>
        <input
          style={{ width: '100%'}}
          type="text"
          placeholder="Search ..."
          value={filterBy}
          onChange={this.handleFilterByChange }
        />
        <input
          type="checkbox"
          name="show-products"
          id="show-products"
          checked={inStockOnly}
          onChange={this.handleInStockChange }
        />
        <span>Only show products in stock</span>
      </div>
    )
  }
}


const ProductTable = (props) => {
  const {filterBy, inStockOnly}  = props
  let products = props.products
  let rows = []
  let lastCategory = null

  products.forEach((product) => {
    if(product.category !== lastCategory) {
      rows.push(<ProductCategoryRow key={product.category} name={product.category}/>)
      lastCategory = product.category
    }

    if(product.name.indexOf(filterBy) === -1) {
      return
    }
    if(inStockOnly && !product.stocked) {
      return
    }

    rows.push(
      <ProductRow
        key={product.name}
        category={lastCategory}
        product={product}
      />
    )
  })

  return (
    <table>
      <thead>
        <tr>
          <th>Price</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}

const ProductCategoryRow = (props) => {
  return (
    <tr>
      <th colSpan="2">
        {props.name}
      </th>
    </tr>
  )
}

const ProductRow = (props) => {
  const { name, price, stocked } = props.product

  return (
    <tr>
      <td style={!stocked ? { color: 'red' } : {} }>{name}</td>
      <td>{price}</td>
    </tr>
  )
}

class FilterableProductTable extends Component {
  constructor () {
    super()

    this.state = {
      filterBy: '',
      inStockOnly: true
    }

    this.handleFilterByChange = this.handleFilterByChange.bind(this)
    this.handleInStockChange = this.handleInStockChange.bind(this)
  }

  handleFilterByChange(filterBy) {
    this.setState({
      filterBy: filterBy
    })
  }

  handleInStockChange(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    })
  }

  render() {
    const products = [
      { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
      { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
      { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
      { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
      { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
      { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
    ]

    return (
      <div style={{ width: '300px', margin: '20px auto'}}>
            Filterable Product Table
            <SearchBar
              filterBy={this.state.filterBy}
              inStockOnly={this.state.inStockOnly}
              onFilterByChange={this.handleFilterByChange}
              onInStockChange={this.handleInStockChange}
            />
            <ProductTable
              products={products}
              filterBy={this.state.filterBy}
              inStockOnly={this.state.inStockOnly}
            />
        </div>
    )
  }
}

export default FilterableProductTable
