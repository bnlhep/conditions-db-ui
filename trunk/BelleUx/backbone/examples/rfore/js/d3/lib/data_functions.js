RforeD3.dataFcn = Backbone.Model.extend({
    jsonTransform: function(jsonData) {
        var data = {
            "headers": null,
            "set": null,
            "name": null
        };
        data.headers = jsonData.header[0];
        data.set = jsonData.data;
        data.name = jsonData.name;
        return data;
    },

    jsonTableTransform: function(jsonData) {
        var data = {
            "headers": null,
            "set": [],
            "name": null
        };

        var headers = jsonData.header[0];
        data.headers = [headers.x, headers.y];

        // FORMAT FOR TABLE
        for (var i = 0; i < jsonData.data.length; i++) {
            var el = jsonData.data[i];
            var obj = {};
            obj[headers.x] = el.x;
            obj[headers.y] = el.y;
            data.set.push(obj);
        }

        data.name = jsonData.name;
        return data;
    },

    dataTabulate: function(appendDOM, data, columns) {
        console.log("Creating Data table in DOM: " + appendDOM);

        // CLEAR DOM
        d3.select("#hor-minimalist-b").remove();

        // CREATE DOM
        var table = d3.select(appendDOM).append("table")
            .attr("id", "hor-minimalist-b")
            thead = table.append("thead"),
            tbody = table.append("tbody");

        // append the header row
        thead.append("tr")
            .selectAll("th")
            .data(columns)
            .enter()
            .append("th")
            .text(function(column) {
                return column;
            });

        // create a row for each object in the data
        var rows = tbody.selectAll("tr")
            .data(data)
            .enter()
            .append("tr");

        console.log("Table created: " + data);

        // create a cell in each row for each column
        var cells = rows.selectAll("td")
            .data(function(row) {
                return columns.map(function(column) {
                    return {
                        column: column,
                        value: row[column]
                    };
                });
            })
            .enter()
            .append("td")
            .attr("style", "font-family: Courier")
            .html(function(d) {
                return d.value;
            });

        return table;
    }
});
