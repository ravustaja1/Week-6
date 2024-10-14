const jsonQuery = {
    "query": [
      {
        "code": "Vuosi",
        "selection": {
          "filter": "item",
          "values": [
            "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007",
            "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015",
            "2016", "2017", "2018", "2019", "2020", "2021"
          ]
        }
      },
      {
        "code": "Alue",
        "selection": {
          "filter": "item",
          "values": ["SSS"]
        }
      },
      {
        "code": "Tiedot",
        "selection": {
          "filter": "item",
          "values": ["vaesto"]
        }
      }
    ],
    "response": {
      "format": "json-stat2"
    }
}

const getData = async () => {
    const url = "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px"

    const res = await fetch(url, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(jsonQuery)
    })
    if(!res.ok) {
        return;
    }
    const data = await res.json()
    return data;
}

const buildChart = async () => {
    const data = await getData();

    const labels = Object.values(data.dimension.Vuosi.category.label);
    const values = data.value;

    const chartData = {
        labels: labels,
        datasets: [
            {
                name: "Population",
                values: values
            }
        ]
    };

    const chart = new frappe.Chart("#chart", {
        title: "Population Growth 2000-2021",
        data: chartData,
        type: "line",
        height: 450,
        colors: ['#eb5146'],
        lineOptions: {
            hideDots: 1,
            regionFill: 0
        }
    });

  cy.wait(5000);
  cy.get('#chart g.dataset-0 path', { timeout: 10000 }).should('be.visible');
}

buildChart();