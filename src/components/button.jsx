// Button es un componente PRESENTACIONAL (no tiene estado propio)
// El padre (Counter) le pasa tres props:
//   label   = texto del boton
//   style   = clases de Tailwind para el estilo
//   onClick = funcion que se ejecuta al hacer click (definida en el padre)
function Button({label, style, onClick}) {
    return <button className={style} onClick={onClick}>
    {label}
    </button>;
}
export default Button;