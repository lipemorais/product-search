import React from 'react'
import { ProductCategoryRow } from './filterable-product-table'
import { cleanup, render } from 'react-testing-library'

afterEach(cleanup)
test('render product category row', () => {
    const product = {
        name: 'fake product name'
    }

    const { queryByText } = render(
        <ProductCategoryRow product={product} />
    )

    expect(queryByText('fake')).not.toBeNull()
})