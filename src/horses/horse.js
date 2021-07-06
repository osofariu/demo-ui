

const filterOne = (filterRequest, data) => {
    const columnIndex = data.headers.findIndex(header => header === filterRequest.columnHeader)
    return data.tableData.filter(row => {
        return row[columnIndex] === filterRequest.value
    })
}

const stringify = (data) => {
    const tableData = data.tableData;
    const res = tableData.map(row => {
        return row.map(item => String(item))
    })
    return {
        ...data,
        tableData: res
    }
}

const horseFilter = (requestFilter, data) => {
    if (requestFilter.length === 0)
        return data
    return {
        ...data,
        tableData: requestFilter.reduce((acc, filterData) => {
            return filterOne(filterData, data)
        }, [])
    }
}

const horseSort = (requestSort, data) => {
    if (!requestSort)
        return data

    const columnIndex = data.headers.findIndex(header => header === requestSort.columnHeader)
    return {
        ...data,
        tableData: data.tableData.sort((first, second) => {
            return first[columnIndex] <= second[columnIndex]
        })
    }
}

export const formatHorseData = (request, data) => {
    const filteredHorses = horseFilter(request.filters, data)
    const sortedHorses = horseSort(request.sorting, filteredHorses)
    return stringify(sortedHorses)
}
