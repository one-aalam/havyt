import underPressure from 'under-pressure'

const up: underPressure.UnderPressureOptions = {
    maxEventLoopDelay: 1000,
    maxHeapUsedBytes: 1000000000,
    maxRssBytes: 1000000000,
    maxEventLoopUtilization: 0.98
}

export default up
