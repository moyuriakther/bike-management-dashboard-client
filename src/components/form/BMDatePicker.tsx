// import { Controller } from "react-hook-form";
// import ReactDatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// type TInputProps = {
//   type: string;
//   name: string;
//   label?: string;
// };

// export default function BMDatePicker({ type, name, label }: TInputProps) {
//   return (
//     <div style={{ marginBottom: "20px" }}>
//       {label ? label : null}
//       <Controller
//         name={name}
//         render={({ field: { onChange, onBlur, value } }) => (
//           <ReactDatePicker
//             onChange={onChange}
//             onBlur={onBlur}
//             selected={value}
//             style={{ color: "rgba(0,0,0,.25)" }}
//             type={type}
//             id={name}
//           />
//         )}
//       />
//     </div>
//   );
// }
