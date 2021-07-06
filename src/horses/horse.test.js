import { formatHorseData } from './horse.js'


describe('horse', function () {
    let horses = {
        headers: ["Breed", "Colour", "Height", "Age", "Shoes"],
        tableData: [["Thoroughbred", "Bay", 1.60, 3, true],
                    ["Thoroughbred", "Grey", 1.55, 3, true],
                    ["Arabian horse", "Bay", 1.51, 5, true],
                    ["Shetland Pony", "Black", 1.01, 2, false],
                    ["Shire horse", "Black", 1.71, 4, true]]
    }
    const baseRequest = {
        filters: [],
        sorting: undefined,
        pagination: undefined
    }

    it('given empty filter, it returns the original list', () => {
        const horsesAsStrings = {
            ...horses,
            tableData: [
                ["Thoroughbred", "Bay", "1.6", "3", "true"],
                ["Thoroughbred", "Grey", "1.55", "3", "true"],
                ["Arabian horse", "Bay", "1.51", "5", "true"],
                ["Shetland Pony", "Black", "1.01", "2", "false"],
                ["Shire horse", "Black", "1.71", "4", "true"]
            ],
        }
        const res = formatHorseData(baseRequest, horses)
        expect(res).toEqual(horsesAsStrings)
    })

    it('when filter is present, apply to the results', () => {
        const request = {
            ...baseRequest,
            filters: [{"columnHeader": "Breed", "value": "Thoroughbred"}]
        }

        const res = formatHorseData(request, horses)
        expect(res).toEqual({
            headers: ["Breed", "Colour", "Height", "Age", "Shoes"],
            tableData: [["Thoroughbred", "Bay", "1.6", "3", "true"],
                        ["Thoroughbred", "Grey", "1.55", "3", "true"]]
        })
    })

    it('with multiple filters', () => {
        const request = {
            ...baseRequest,
            filters: [
                {"columnHeader": "Breed", "value": "Thoroughbred"},
                {"columnHeader": "Colour", "value": "Grey"}]
        }

        expect(formatHorseData(request, horses)).toEqual({
            headers: ["Breed", "Colour", "Height", "Age", "Shoes"],
            tableData: [["Thoroughbred", "Grey", "1.55", "3", "true"]]
        })
    })

    it('sorts results', () => {
        const request = {
            ...baseRequest,
            "sorting": {"columnHeader": "Height", "sortOrder": "Descending"},
        }

        expect(formatHorseData(request, horses)).toEqual(
            {
                headers: ["Breed", "Colour", "Height", "Age", "Shoes"],
                tableData: [["Thoroughbred", "Bay", "1.6", "3", "true"],
                    ["Thoroughbred", "Grey", "1.55", "3", "true"],
                    ["Arabian horse", "Bay", "1.51", "5", "true"],
                    ["Shetland Pony", "Black", "1.01", "2", "false"],
                    ["Shire horse", "Black", "1.71", "4", "true"]]
            }
        )
    })
});
