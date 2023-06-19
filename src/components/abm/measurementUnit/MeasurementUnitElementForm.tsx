import { useDispatch, useSelector } from "react-redux";
import { MeasurementUnit } from "../../../interface/MeasurementUnit";
import { useState, useEffect } from "react";
import {
  addMeasurementUnit,
  modifyMeasurementUnit,
} from "../../../context/measurementUnitSlice";
import { RootState } from "../../../context/store";
import { useNavigate, useParams } from "react-router-dom";
import "./MeasurementUnitForm.css";

const INITIAL_STATE = {
  id: 0,
  denominacion: "",
};

const MeasurementUnitListElementAdd = () => {
  const measurementUnitArray = useSelector(
    (state: RootState) => state.measurementUnit
  );
  const [newMeasurementUnit, setNewMeasurementUnit] =
    useState<MeasurementUnit>(INITIAL_STATE);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const handleConfirm = (e: any) => {
    e.preventDefault();
    if (params.id) {
      dispatch(modifyMeasurementUnit(newMeasurementUnit));
    } else {
      dispatch(
        addMeasurementUnit({
          ...newMeasurementUnit,
          id: measurementUnitArray.length + 1,
        })
      );
    }
    navigate("/measurementUnitList");
  };

  const handleChange = (e: any) => {
    console.log(e.target.value);
    setNewMeasurementUnit({
      ...newMeasurementUnit,
      [e.target.name]: e.target.value,
    });
  };

  const handleExit = (e: any) => {
    navigate("/measurementUnitList");
  };

  useEffect(() => {
    const param: any = params.id;
    if (param) {
      const measurementUnitElement = measurementUnitArray.find(
        (u: MeasurementUnit) => u.id === parseInt(param)
      );
      if (measurementUnitElement) setNewMeasurementUnit(measurementUnitElement);
    }
  }, []);

  return (
    <div className="MeasurementUnitFormBody">
      <div className="MeasurementUnitFormBodyModal">
        <div>
          <h6 className="text-center">Denominacion</h6>
        </div>
        <div className="MeasurementUnitFormBodyDetails">
          <input
            type="text"
            name="denominacion"
            placeholder="denominacion"
            className="MeasurementUnitFormDenIn"
            value={newMeasurementUnit.denominacion}
            onChange={handleChange}
          />
        </div>
        <div className="MeasurementUnitFormBodyButtons">
          <button onClick={handleConfirm}>Confirmar</button>
          <button onClick={handleExit}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default MeasurementUnitListElementAdd;
