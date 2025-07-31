
import nodemailer from 'nodemailer';
import type { Reclamacion, SiteConfig } from '@/types';

// Configure the transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: Number(process.env.EMAIL_SERVER_PORT) === 465, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

function generateHtmlContent(reclamacion: Reclamacion, config: SiteConfig, forAdmin: boolean): string {
  const title = forAdmin ? "Nuevo Reclamo Recibido" : "Confirmación de Hoja de Reclamación";
  const intro = forAdmin 
    ? `Se ha registrado un nuevo reclamo en el Libro de Reclamaciones de ${config.configuracionGeneral.nombreTienda}.`
    : `Hemos recibido tu Hoja de Reclamación. A continuación, te mostramos una copia de la información que registraste.`;

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
        h1, h2 { color: #111; }
        h1 { font-size: 24px; }
        h2 { font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 20px; }
        strong { color: #555; }
        .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #888; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>${title}</h1>
        <p>${intro}</p>
        
        <h2>Datos del Reclamo (ID: ${reclamacion.id})</h2>
        <p><strong>Fecha del Reclamo:</strong> ${new Date(reclamacion.fechaReclamo).toLocaleDateString('es-ES')}</p>
        <p><strong>Tipo de Reclamación:</strong> ${reclamacion.tipoReclamacion}</p>
        <p><strong>Bien Contratado:</strong> ${reclamacion.tipoBien}</p>

        <h2>Datos del Consumidor</h2>
        <p><strong>Nombre Completo:</strong> ${reclamacion.nombreCompleto}</p>
        <p><strong>Documento:</strong> ${reclamacion.tipoDocumento} - ${reclamacion.numeroDocumento}</p>
        <p><strong>Email:</strong> ${reclamacion.email}</p>
        ${reclamacion.telefono ? `<p><strong>Teléfono:</strong> ${reclamacion.telefono}</p>` : ''}
        
        <h2>Detalle del Reclamo</h2>
        <p><strong>Descripción:</strong></p>
        <p>${reclamacion.detalleReclamacion}</p>
        ${reclamacion.pedido ? `<p><strong>Pedido del consumidor:</strong> ${reclamacion.pedido}</p>` : ''}
        
        <div class="footer">
          ${config.configuracionGeneral.nombreTienda} &copy; ${new Date().getFullYear()}
        </div>
      </div>
    </body>
    </html>
  `;
}


/**
 * Sends a confirmation email to the user who submitted the claim.
 */
export async function sendReclamacionConfirmation(reclamacion: Reclamacion, config: SiteConfig) {
  const mailOptions = {
    from: `"${config.configuracionGeneral.nombreTienda}" <${process.env.EMAIL_FROM}>`,
    to: reclamacion.email,
    subject: `Confirmación de Reclamo N° ${reclamacion.id}`,
    html: generateHtmlContent(reclamacion, config, false),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${reclamacion.email}`);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}

/**
 * Sends a notification email to the store owner.
 */
export async function sendReclamacionNotification(reclamacion: Reclamacion, config: SiteConfig) {
  const mailOptions = {
    from: `"${config.configuracionGeneral.nombreTienda} - Sistema" <${process.env.EMAIL_FROM}>`,
    to: config.contacto.correo, // Sends to the store's contact email
    subject: `Nuevo Reclamo Recibido - N° ${reclamacion.id}`,
    html: generateHtmlContent(reclamacion, config, true),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Notification email sent to ${config.contacto.correo}`);
  } catch (error) {
    console.error('Error sending notification email:', error);
  }
}
