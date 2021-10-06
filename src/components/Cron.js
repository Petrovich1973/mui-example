import React from 'react'
// import '../bootstrap.min.css'
import {ReCron, CronLocalization} from '@sbzen/re-cron';

const localization = {
    tabs: {
        seconds: 'Секунды',
        minutes: 'Минуты'
    },
    quartz: {
        second: {
            every: {
                label: 'Каждую секунду'
            },
            increment: {
                label1: 'Каждую',
                label2: 'секунду, начиная с секунды'
            },
            and: {
                label: 'Конкретна секунда (виберіть одну або кілька)'
            },
            range: {
                label1: 'Щосекунди між секундою',
                label2: 'і секундою'
            }
        }
    }
};

const CronComponent = () => {
    const [value, setValue] = React.useState('')

    return (
        <div>

            <ReCron
                value={value}
                onChange={(e) => setValue(e)}
                localization={localization}/>

            {/*<Cron*/}
            {/*    onChange={e => setValue(e)}*/}
            {/*    value={value}*/}
            {/*    showResultText={true}*/}
            {/*    showResultCron={true}*/}
            {/*    locale={'ru'}*/}
            {/*/>*/}
        </div>

    )
}

export default CronComponent