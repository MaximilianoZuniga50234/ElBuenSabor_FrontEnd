import { Stock } from "../../../interface/Stock";
import { MeasurementUnit } from "../../../interface/MeasurementUnit";

interface Props {
  measurementUnitId?: number;
  measurementUnitArray: MeasurementUnit[];
}

const MeasurementUnitElementView = ({
  measurementUnitId,
  measurementUnitArray,
}: Props) => {
  const measurementUnitElement = measurementUnitArray.find(
    (u: MeasurementUnit) => u.id === measurementUnitId
  );

  return (
    <div className="itemStockElementBody">
      <div className="itemStockElementBodyDetails">
        <p>{measurementUnitElement?.denominacion}</p>
      </div>
    </div>
  );
};

export default MeasurementUnitElementView;
