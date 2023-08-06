'use client'
import { useCallback, useState } from 'react'
import Spreadsheet from 'react-spreadsheet'
import { useDebouncedCallback } from 'use-debounce'
import axios from 'axios'

export const Test: React.FC = () => {
  const [data, setData] = useState<{ value: string }[][]>([])

  const setNewData = (newData: { value: string }[][], ignoreDiff?: boolean) => {
    // This function will tell us what actually changed in the data (the column / row)
    const diff = findDiff(data, newData)

    // Only if there was not real change, or we didn't ask to ignore changes, trigger the debouncer.
    if (diff || ignoreDiff) {
      return debouncer(newData, diff)
    }
  }

  const findDiff = useCallback((oldData: { value: string }[][], newData: { value: string }[][]) => {
    for (let i = 0; i < oldData.length; i++) {
      for (let y = 0; y < oldData[i].length; y++) {
        if (oldData[i][y] !== newData[i][y]) {
          return {
            oldValue: oldData[i][y].value,
            value: newData[i][y].value,
            row: i,
            col: y,
          }
        }
      }
    }
  }, [])

  // Add a new column
  const addCol = useCallback(() => {
    setNewData(data.length === 0 ? [[{ value: '' }]] : data.map((p: any) => [...p, { value: '' }]), true)
  }, [data])

  // Add a new row
  const addRow = useCallback(() => {
    setNewData([...data, data?.[0]?.map(() => ({ value: '' })) || [{ value: '' }]], true)
  }, [data])

  // Remove a row by index
  const removeRow = useCallback(
    (index: number) => (event: any) => {
      setNewData([...data.slice(0, index), ...data.slice((index || 0) + 1)], true)
      event.stopPropagation()
    },
    [data],
  )

  // Remove a column by index
  const removeCol = useCallback(
    (index: number) => (event: any) => {
      setNewData(
        data.map(current => {
          return [...current.slice(0, index), ...current.slice((index || 0) + 1)]
        }),
        true,
      )
      event.stopPropagation()
    },
    [data],
  )

  const updateServer = useCallback((serverData?: { value: string; col: number; row: number }) => {
    if (!serverData) {
      return
    }
    console.log(serverData)
    return axios.post('/api/update-record', serverData)
  }, [])

  const debouncer = useDebouncedCallback((newData: any, diff) => {
    setData(oldData => {
      // update the server with our new data
      updateServer(diff)
      return newData
    })
  }, 500)

  return (
    <div className="flex items-stretch justify-center">
      <div className="flex flex-col">
        <Spreadsheet
          columnLabels={data?.[0]?.map((d, index) => (
            <div key={index} className="flex items-center justify-center space-x-2">
              <div>{String.fromCharCode(64 + index + 1)}</div>
              <div className="text-xs text-red-500" onClick={removeCol(index)}>
                X
              </div>
            </div>
          ))}
          rowLabels={data?.map((d, index) => (
            <div key={index} className="flex items-center justify-center space-x-2">
              <div>{index + 1}</div>
              <div className="text-xs text-red-500" onClick={removeRow(index)}>
                X
              </div>
            </div>
          ))}
          darkMode={true}
          data={data}
          className="w-full"
          onChange={setNewData}
        />
        <div
          onClick={addRow}
          className="bg-[#060606] border border-[#313131] border-t-0 mb-[6px] flex justify-center py-1 cursor-pointer">
          +
        </div>
      </div>
      <div
        onClick={addCol}
        className="bg-[#060606] border border-[#313131] border-l-0 mb-[6px] flex items-center px-3 cursor-pointer">
        +
      </div>
    </div>
  )
}
