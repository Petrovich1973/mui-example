import React from 'react'
import {ReportsList} from "../components/Demo/ReportsList"
import reports from '../reports.json'

export default function Demo() {
    const [reportsTpl, setReports] = React.useState([])

    const normalizeList = reports.root.row
        // Убираю мусор
        .filter(f => (f.NAME_PROC !== "no proc"))
        .filter(f => (f.NAME_REPORT !== "Тестовый отчет для отладки"))
        .filter(f => (f.TITLE !== "меню 1"))

    const reportsCount = normalizeList
        .reduce((sum, current) => {
            if (!sum.some(f => (f.NAME_REPORT === current.NAME_REPORT && f.TITLE === current.TITLE))) sum.push(current)
            return sum
        }, [])
        .filter(f => (f.NAME_REPORT)).length

    const memoizedCallback = React.useCallback((n) => {
        const list = n
            // Формирую группы
            .reduce((sum, current) => {
                delete current.NAME_PROC
                if (current.GROUP_NAME) sum.push({...current, children: []})
                else sum[sum.length - 1].children.push({...current, children: []})
                return sum
            }, [])
            .reduce((sum, current) => {
                if (!([current.GROUP_NAME] in sum)) sum[current.GROUP_NAME] = []
                sum[current.GROUP_NAME].push(current)
                return sum
            }, {})

        const list2 = Object.keys(list)
            .map(key => {
                // Собираю в виде дерева
                const l1 = list[key]
                    // Удаляю дубликаты
                    .reduce((sum, current) => {
                        if (!sum.some(f => (f.NAME_REPORT === current.NAME_REPORT && f.TITLE === current.TITLE))) sum.push(current)
                        // else console.log('duplicated', current)
                        return sum
                    }, [])
                    .map(m => {
                        ///////
                        const l2 = []
                        const l3 = []
                        const l4 = []
                        m.children.forEach(el => {
                            if (el.MENU_NUMBER.split('.').length === 4) l4.push({...el, GROUP_NAME: key})
                            if (el.MENU_NUMBER.split('.').length === 3) l3.push({...el, GROUP_NAME: key})
                            if (el.MENU_NUMBER.split('.').length === 2) l2.push({...el, GROUP_NAME: key})
                        })
                        l4.forEach(el => {
                            const n = el.MENU_NUMBER.split('.').slice(0, -1).join('.')
                            const idx = l3.findIndex(f => f.MENU_NUMBER === n)
                            if (idx > -1) {
                                if (('children' in l3[idx])) l3[idx].children.push(el)
                                else {
                                    l3[idx].children = []
                                    l3[idx].children.push(el)
                                }
                            }
                        })
                        l3.forEach(el => {
                            const n = el.MENU_NUMBER.split('.').slice(0, -1).join('.')
                            const idx = l2.findIndex(f => f.MENU_NUMBER === n)
                            if (idx > -1) {
                                if (('children' in l2[idx])) l2[idx].children.push(el)
                                else {
                                    l2[idx].children = []
                                    l2[idx].children.push(el)
                                }
                            }
                        })
                        ///////
                        return ({...m, children: l2})
                    })

                return {group: key, children: l1}
            })
        // console.log(list2)
        setReports(list2)
    }, [])

    React.useEffect(() => {
        memoizedCallback(normalizeList)
    }, [memoizedCallback])

    return (
        <div className="container">
            <ReportsList list={reportsTpl} reportsCount={reportsCount}/>
        </div>
    )
}
