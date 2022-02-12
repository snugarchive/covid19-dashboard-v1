import React from 'react'
import GraphList from './GraphList'

function AllCharts({ sections }) {
  return (
    <div className='main'>
      <div className='national'>
        {sections && (
          <GraphList
            sections={sections.filter(
              (section) => section.className === 'national'
            )}
            title='대시보드'
          />
        )}
      </div>
      <div className='global'>
        {sections && (
          <GraphList
            sections={sections.filter(
              (section) => section.className === 'global'
            )}
          />
        )}
      </div>
    </div>
  )
}

export default AllCharts
