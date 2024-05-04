import React from "react";
//Formik
import { Field } from "formik";
// style
// import "@styles/scss/sharedComponent/form.scss";

export default function Checkbox({ label, name , formik }) {
    return (
        <>
            <label className="checkbox-label  align-items-center d-flex ms-5">
                <input type="checkbox" name={name}
                    className="me-2"
                    checked={formik.values.whatsapp}
                    onChange={formik.handleChange}
                />
                {label}
            </label>
        </>
    );
}
