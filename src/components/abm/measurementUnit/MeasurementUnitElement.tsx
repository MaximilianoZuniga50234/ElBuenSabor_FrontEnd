import MeasurementUnitElementView from "./MeasurementUnitElementView";
import { useSelector } from "react-redux";
import { RootState } from "../../../context/store";

interface Props {
  measurementUnitId: number;
  closeModal: () => void;
}

const MeasurementUnitElement = ({ measurementUnitId, closeModal }: Props) => {
  const measurementUnitArray = useSelector(
    (state: RootState) => state.measurementUnit
  );

  return (
    <div>
      <div>
        <h5>ID</h5>
        <h6>Denominacion</h6>
      </div>
      <MeasurementUnitElementView
        measurementUnitId={measurementUnitId}
        measurementUnitArray={measurementUnitArray}
      />
    </div>
  );
};

export default MeasurementUnitElement;
