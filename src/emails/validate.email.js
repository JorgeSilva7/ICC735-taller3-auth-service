const email = ({ name, code }) =>
	`<h1> Hola ${name}! </h1>` +
	"<p> Necesitas validar este email para unirte a la plataforma </p>" +
	`<p> Usa este codigo en la aplicación: ${code} </p>` +
	`<p> <strong>¡Respeta las mayúsculas y minúsculas!</strong> </p>` +
	`<br><p> Un saludo :) </p>`;

export default email;
