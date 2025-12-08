/**
 * This component is a skeleton for each input field in the mission configuration.
 * @param props Default value of the field, the measurement unit, the minimum viable value, the maximum accepted value, the function to set the value
 * @returns The input field
 */

import './style.scss';

const MissionInput = (props: {defaultValue: number, unit: string, minValue: number, maxValue: number, setValue: (value: number) => void}) => {

  const minValue = props.minValue;
  const maxValue = props.maxValue;

  const value = props.defaultValue;
  const setValue = props.setValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(+e.target.value)
  }

  const onBlur = () => {
    if(value < minValue)
      setValue(minValue);
    else if(value > maxValue)
      setValue(maxValue);
  }

  const onDecreaseClick = () => {

    if(value <= minValue) setValue(minValue);
    else setValue(value - 1);
  }

  const onIncreaseClick = () => {
    if(value >= maxValue) setValue(maxValue);
    else setValue(value + 1);
  }

  return(
    <>
      <div className="mission-input">
        <input className='input-value' value={value} onChange={handleChange} onBlur={onBlur}/>
        <div className='input-unit'>{props.unit}</div>

        <button className='value-button' onClick={() => onDecreaseClick()}>-</button>
        <button className='value-button' onClick={() => onIncreaseClick()}>+</button>
      </div>
    </>
  )
}

export default MissionInput;