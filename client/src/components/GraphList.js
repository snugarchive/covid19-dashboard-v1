import React from 'react'
import { Chart } from "react-chartjs-2";

const GraphList = ({ sections }) => {
    return (
      <>
        {sections.map((section) => (
          <div className={section.id} key={section.id} id={section.id}>
            <Chart
              type={section.type}
              options={section.options}
              data={section.data}
              plugins={section.plugins}
            />
          </div>
        ))}
      </>
    );
}

export default GraphList
