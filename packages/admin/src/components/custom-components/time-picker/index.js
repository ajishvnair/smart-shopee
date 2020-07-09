import React, { useCallback, useState, useEffect } from "react";
import moment from "moment";
import { TimePicker } from "antd";

export default React.memo(function ({ value, onChange }) {
    const timeFormat = "mm:ss";
    const [time, setTime] = useState(
        value ? moment(value, timeFormat) : undefined
    );

    useEffect(() => {
        setTime(value ? moment(value, timeFormat) : null);
    }, [value]);

    /**
     * update associated form field value
     * @param {*} timeStrings time in `mm:ss` format
     */
    const triggerChange = useCallback(
        (timeStrings) => {
            if (onChange) {
                onChange(timeStrings);
            }
        },
        [onChange]
    );

    /**
     * on time change
     * @param {*} time in moment format
     */
    const onTimeChange = useCallback(
        (timeValue) => {
            setTime(timeValue);
            const timeStrings = timeValue
                ? timeValue.format(timeFormat)
                : undefined;
            triggerChange(timeStrings);
        },
        [triggerChange]
    );

    return (
        <span>
            <TimePicker
                onChange={onTimeChange}
                value={time}
                style={{ width: "150px" }}
                placeholder="Minute:Seconds"
                format={timeFormat}
            />
        </span>
    );
});
