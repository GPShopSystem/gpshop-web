import React, { useState, Fragment, useEffect } from 'react';
import useForm from "react-hook-form";
import { API } from '/utils/ws'
import moment from 'moment';
import Head from 'next/head'
import { Button, Footer } from 'components';
import windowResize from 'hooks/windowResize'
import Scrollbar from 'react-scrollbars-custom'
import iconTimer from 'static/user-time.svg'
import iconCalendar from 'static/icons/calendar.svg'
import iconClock from 'static/icons/clock.svg'
import imageFinish from 'static/buyFinish.svg'
import iconwhatsapp from 'static/icons/whatsapp-full.svg'
import iconfacebook from 'static/icons/facebook-full.svg'
import icontwitter from 'static/icons/twitter-full.svg'
import iconCulqi from 'static/icons/culqi.svg'
import iconVisa from 'static/icons/visa.svg'
import iconMastercard from 'static/icons/mastercard.svg'
import iconDinersClub from 'static/icons/diners-club.svg'
import iconAmex from 'static/icons/amex.svg'
import iconShield from 'static/shield_seguro.svg'
import iconShieldDolar from 'static/shield_dolar.svg'
import duuviLogoGray from 'static/duuvi-logo-gray.svg'
import Modal from 'react-responsive-modal';

import {
  Tooltip,
} from 'react-tippy';
import {
  Container,
  BackgroundImageBlured,
  DuuviImage,
  Content,
  BodyContent,
  BodyContenLeft,
  Title,
  TitleBody,
  Description,
  WrapCover,
  WrapCoverText,
  CoverText,
  CoverTextIcon,
  BodyContentCols,
  BodyContenRight,
  BodyContenRightTitle,
  BodyContenRightDetails,
  BodyContenRightDetailsTitle,
  BodyContenRightDetailsTitleIcon,
  BodyContenRightDetailsSelects,
  SelectDate,
  Pricing,
  PricingArrow,
  WrapButton,
  Payments,
  BodyContenRightAviso,
  BodyContenRightAvisoImage,
  BodyContenRightAvisoTitle,
  BodyContenRightAvisoDescription,
  WrapBackgroundImageBlured,
  ModalHeader,
  ModalSubHeader,
  ModalSubHeaderIcon,
  ModalSubHeaderDescription,
  ModalContent,
  ModalTitle,
  ModalContentLeft,
  ModalContentRight,
  ModalContentList,
  Separator,
  Dotted,
  TicketListContainer,
  TicketContent,
  TicketQuantity,
  TicketQuantitCenter,
  TicketQuantityUpDown,
  TicketContentName,
  ModalFooter,
  TicketContentDocument,
  TicketContentDocumentHeader,
  TicketContentDocumentList,
  ViewProcess,
  BodyContainerRightAviso,
  BuyerInfoContent,
  BuyerInfoForm,
  BuyerInfoType,
  BuyerInfoContentCupon,
  ProcessResumenHeader,
  ProcessResumenContent,
  ProcessResumenContentItem,
  ProcessResumenFooter,
  ProcessAviso,
  SocialLinks,
  SeparatorBlue,
  ModalClose,
  MenuHeader,
  LoadingProcess,
  ModalContentLogo,
  ButtonFloat,
  TextValidation,
  TextDashed,
  TicketOfStock
} from './styles';

import Map from '../../map';
import Field from '../../organisms/field';
import Input from '../../atoms/input';
moment.locale('es');

const styleMaps = {
  height: '180px',
  borderRadius: '8px',
  overflow: 'hidden',
  marginTop: '12px',
  marginBottom: '12px',
};

const pad = (number, length) => {
  var str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}

const plural = (str, cantidad, sufijo) => {
  if (cantidad == 0) {
    return str + sufijo
  }
  if (cantidad > 1) {
    return str + sufijo
  }
  return str
}

const EventViewTemplate = ({ data }) => {
  const [imageBackgroundData, setimageBackgroundData] = useState({
    height: 0,
    width: 0
  });

  useEffect(() => {
    if(imageBackgroundData.height == 0){
      var img = new Image();
      img.onload = function () {
        setimageBackgroundData({
          height: this.height,
          width: this.width
        });
      }
      img.src = data.imagen;
    }

    window.culqi = function () {
      if (Culqi.token) { // ¡Objeto Token creado exitosamente!
        processPay(Culqi.token)
      }
      if(Culqi.error){
        message.error(Culqi.error.user_message)
      }
    }
  });

  const [modalOpen, setModalOpen] = useState(false);

  const [modalStep, setModalStep] = useState(1);

  const [processData, setProcessData] = useState({
    dnis: [],
    fecha_selected: null,
    hora_selected: null,
    form: {
      email: '',
      nombres: '',
      apellidos: '',
      telefono: '',
      ruc: '',
      razon_social: '',
      dni: ''
    },
    cupon: '',
    discount: 0,
    tipo_cliente: 1,
    tokenBuy: '',
    paymentPrice: 0,
    paymentDiscount: 0,
    paymentDiscountId: 0,
    type_payment: 'tarjeta',
    loadingText: '',
    loading: false,
    comision: 0
  })

  const { handleSubmit, register, errors, getValues } = useForm({
    mode: 'onBlur',
    nativeValidation: false
  });

  const [descriptionStep] = useState([
    {
      title: 'Selecciona la fecha',
      description: ''
    },
    {
      title: '¿Cuántas llevarás?',
      description: 'Compra todas las que quieras. Al terminar el proceso de compra te enviaremos toda la información a tu correo.'
    },
    {
      title: 'Formulario de compra',
      description: 'Ingresa los datos de facturación. Recuerda que esta información es importante para realizar consultas con la empresa organizadora.',
      // description: 'En cada campo, ingresa el DNI de los participantes. Recuerda que esta información es importante para ingresar al evento.'
    },
    {
      title: '¡Entradas calentitas recién salidas del horno!',
      description: 'Hemos preparado un pequeño resúmen de tu pedido. Verififica si todo está correcto para continuar. '
    }]
  );

  const mapOptions = {
    zoom: 15,
    center: {
      lat: data.latitud,
      lng: data.longitud,
    },
    streetViewControl: true,
    mapTypeControl: false,
    styles: [
      {
        "featureType": "all",
        "stylers": [
          {
            "saturation": 0
          },
          {
            "hue": "#e7ecf0"
          }
        ]
      },
      {
        "featureType": "road",
        "stylers": [
          {
            "saturation": -70
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "stylers": [
          {
            "visibility": "simplified"
          },
          {
            "saturation": -60
          }
        ]
      }
    ]
  };

  const isMobile = windowResize().width <= 799

  const list_schedules = data.fechas.find(e => e.id === processData.fecha_selected)

  const selected_tickets = data.entradas.filter(e => e.selects && e.selects > 0)

  const setFormData = (item, target) => {
    setProcessData({ ...processData, ...processData.form[item] = target.target.value })
  }

  const renderSecurity = () => {
    return <BodyContainerRightAviso>
      <BodyContenRightAviso>
        <BodyContenRightAvisoImage>
          <img src={iconShield} />
        </BodyContenRightAvisoImage>
        <BodyContenRightAvisoTitle>
          ¡Aseguramos tu información!
        </BodyContenRightAvisoTitle>
        <BodyContenRightAvisoDescription>
          No usamos tu información de contacto personal con fines comerciales.
        </BodyContenRightAvisoDescription>
      </BodyContenRightAviso>
      <BodyContenRightAviso>
        <BodyContenRightAvisoImage>
          <img src={iconShieldDolar} />
        </BodyContenRightAvisoImage>
        <BodyContenRightAvisoTitle>
          ¡Compras son seguras!
        </BodyContenRightAvisoTitle>
        <BodyContenRightAvisoDescription>
          Todos tus datos de facturación están encriptados y transmitidos sin ningún riesgo de filtración.
        </BodyContenRightAvisoDescription>
      </BodyContenRightAviso>
    </BodyContainerRightAviso>
  }

  const resetProcess = (open = false, step = 1) => {
    setModalOpen(open)
    if(step === 0){
      // let first_date = null
      // let hour = null
      // first_date = data.fechas.length >= 1 ? data.fechas[0] : null
      // if(first_date){
      //   hour = first_date.horarios.length > 1 ? null : first_date.horarios[0] ? first_date.horarios[0].id : null
      //   first_date = first_date.id 
      // }
      // // pre select first date and hour
      // setProcessData({
      //   ...processData,
      //   ...processData.fecha_selected = first_date,
      //   ...processData.hora_selected = hour
      // })
    }
    setModalStep(step)
    data.entradas.map(d => d.selects = 0)
    setProcessData({
      ...processData,
      ...processData.paymentPrice = 0,
      ...processData.dnis = [],
      ...processData.tipo_cliente = 1,
      ...processData.paymentDiscount = 0,
      ...processData.paymentDiscountId = null,
      ...processData.discount = 0,
      ...processData.form = {
        email: '',
        nombres: '',
        apellidos: '',
        telefono: '',
        ruc: '',
        razon_social: '',
        cupon: '',
        dni: ''
      }
    })
  }

  const fetchCoupon = async () => {
    try {
      let response = await API.request('buy/cupon', 'POST', {
        cupon: processData.cupon,
        evento_id: data.id
      })
      let discount = (((processData.paymentPrice * parseFloat(response.data.porcentaje) / 100)))
      message.success('Cupón válido por el ' + response.data.porcentaje + '% de descuento.')
      setProcessData({
        ...processData,
        ...processData.paymentDiscount = response.data.porcentaje,
        ...processData.paymentDiscountId = response.data.id,
        ...processData.discount = discount
      })
    } catch (error) {
      setProcessData({
        ...processData,
        ...processData.paymentDiscount = 0,
        ...processData.paymentDiscountId = null,
        ...processData.discount = 0
      })
      API.response(error)
    }
  }

  const processButton = () => {
    switch (modalStep) {
      case 0:
        return <div className={'buttons'}>
          <Button secondary onClick={() => resetProcess(false, 0)}>Cancelar</Button>
          <Button disabled={!(processData.hora_selected && processData.fecha_selected)} onClick={() => {
            setModalStep(modalStep + 1)
            setToTop()
          }}>Continuar</Button>
        </div>
      case 1:
        return <div className={'buttons'}>
          <Button secondary onClick={() => {
            if (!isMobile) return resetProcess()
            setModalStep(modalStep - 1)
          }}>
            {isMobile ? 'Retroceder' : 'Cancelar'} 
          </Button>
          <Button disabled={selected_tickets.length === 0} onClick={() => {
            setModalStep(modalStep + 1)
            setToTop() 
          }}>Continuar</Button>
        </div>
      case 2:
        return <div className={'buttons'}>
          <Button secondary onClick={() => setModalStep(modalStep - 1)}>Retroceder</Button>
          <Button onClick={handleSubmit((data) => {
            if (Object.keys(errors).length === 0){
              setModalStep(modalStep + 1)
              setToTop() 
            }
          })}>Continuar</Button>
        </div>
      case 3:
        return <div className={'buttons'}>
          <Button secondary onClick={() => setModalStep(modalStep - 1)}>Retroceder</Button>
          <Button green onClick={() => sendPayment()}><img src={iconCulqi} style={{marginRight: 3 }}/> Comprar</Button>
        </div>
    }
  }

  const processBuyContainer = () => {
    let ifFinishProcess = modalStep === 4
    return <Fragment>
      <ModalClose onClick={() => resetProcess()}><i className="material-icons">close</i></ModalClose>
      <ModalHeader>
        {ifFinishProcess ? 'Entrada comprada ' : 'Comprar entrada'}
      </ModalHeader>

      {
        !ifFinishProcess && <ModalSubHeader
          style={{
            background: (modalStep === 3) ? 'white' : null,
            marginTop: (modalStep === 3) ? 20 : null,
            borderTopLeftRadius: (modalStep === 3) ? 10 : null,
            borderTopRightRadius: (modalStep === 3) ? 10 : null
          }}
        >
          <ModalSubHeaderIcon>
            <img src={iconTimer} />
          </ModalSubHeaderIcon>
          <ModalSubHeaderDescription>
            <ModalTitle>{descriptionStep[modalStep].title}</ModalTitle>
            <p> {descriptionStep[modalStep].description}</p>
          </ModalSubHeaderDescription>
        </ModalSubHeader>
      }

      {processBuySteps()}

      {
        !ifFinishProcess && (
          <ModalFooter>
            <div>
              Al continuar confirmas ser mayor de edad  y haber leído los <a href='https://duuvi.com/terminos-condiciones/' style={{ color:'#3B5282'}} target='_blank'>términos y condiciones</a>.
            </div>
            {
              processButton()
            }
          </ModalFooter>
        )
      }
    </Fragment>
  }

  const addTicket = (pos) => {
    let position = data.entradas.findIndex(d => d.id === pos)
    data.entradas[position].selects = data.entradas[position].selects || 0
    if ((data.entradas[position].entradas_restantes > data.entradas[position].selects) && (data.entradas[position].selects < data.entradas[position].cantidad_maxima_usuario)) {
      for (let tD = 1; tD <= data.entradas[position].cantidad_minima; tD++) {
        processData.dnis.push({
          dni: '',
          evento_entrada_id: data.entradas[position].id
        })
      }      
      data.entradas[position].selects = data.entradas[position].selects + data.entradas[position].cantidad_minima
      processData.paymentPrice += data.entradas[position].precio_final
      setProcessData({ ...processData })
    }
  }

  const removeTicket = (pos) => {
    let position = data.entradas.findIndex(d => d.id === pos)
    data.entradas[position].selects = data.entradas[position].selects || 0
    if (data.entradas[position].selects > 0) {
      processData.paymentPrice -= data.entradas[position].precio_final
      for (let tD = 1;  tD <= data.entradas[position].cantidad_minima; tD++) {
        let index = processData.dnis.findIndex(x => x.evento_entrada_id === data.entradas[position].id);
        processData.dnis.splice(index, 1)
      }
      data.entradas[position].selects = data.entradas[position].selects - data.entradas[position].cantidad_minima
      setProcessData({ ...processData })
    }
  }

  const setDNI = (index, idTicket, event) => {
    let listDNIS = processData.dnis.filter(e => e.evento_entrada_id === idTicket)
    if (listDNIS.length > 0 && listDNIS[index]) {
      listDNIS[index]['dni'] = event.target.value
    } else {
      processData.dnis.push({
        dni: event.target.value,
        evento_entrada_id: idTicket
      })
    }
    setProcessData({ ...processData })
  }

  const setToTop = (init = null) => {
    if(!isMobile) return 

    return window.scrollTo({ top: 0, behavior: init ? 'auto' : 'smooth' });
  }
  
  const renderOrder = () => {
    return <Fragment>
      <ModalTitle>Tu pedido</ModalTitle>
      <ModalContentList isSmall>
        <div><i className="material-icons">date_range</i></div>
        <div>{!!list_schedules && moment(list_schedules.fecha).format('ddd DD MMMM')}</div>
      </ModalContentList>
      <ModalContentList isSmall>
        <div><i className="material-icons">place</i></div>
        <div>{data.direccion}</div>
      </ModalContentList>
      {
        selected_tickets.length > 0 ?
          <Fragment>
            <Separator />
            {
              selected_tickets.map((e, i) => <ModalContentList key={'mini-resumen-tickets' + e.id} columns='22px auto auto'>
                <div>{pad((e.selects / e.cantidad_minima), 2)}</div>
                <Dotted>x {e.nombre}</Dotted>{/* interbank */}
                <div style={{ textAlign: 'right', display: data.id === 6 ? 'none' : '' }}>s/ {(e.selects / e.cantidad_minima) * e.precio_final}</div>
              </ModalContentList>)
            }
            <Separator />
            <ModalContentList columns='60px auto' style={{ display: data.id === 6 ? 'none' : ''}}>
              <div style={{ color: '#3B5282' }}><b className='b-600'>Subtotal</b></div>{/* interbank */}
              <div style={{ textAlign: 'right', fontWeight: '600' }}>s/ {processData.paymentPrice}</div>
            </ModalContentList>
          </Fragment>
          : null
      }
      <ModalContentLogo>
        <img src={duuviLogoGray} height={50} />
      </ModalContentLogo>
    </Fragment>
  }

  const processBuySteps = () => {
    let linkShare = (social) => {
      if (typeof window !== 'undefined') {
        let text = encodeURIComponent('Hola! iré a este evento: ' + data.nombre) + '. ¿Quisieras ir también? -> ' + encodeURIComponent(window.location.href + '?shared=' + social)
        return text
      }
    }
    switch (modalStep) {
      case 0:
        return <ModalContent columns='auto' style={{ padding: '20px 24px'}}>
          <ModalTitle>Selecciona el día</ModalTitle>
          <MenuHeader style={{marginTop: 20}}>
            <BodyContenRightDetailsTitle style={{lineHeight: '16px'}}>
              <BodyContenRightDetailsTitleIcon>
                <img src={iconCalendar} />
              </BodyContenRightDetailsTitleIcon>
              <span style={{fontWeight: 'normal'}}>Selecciona la fecha en la que asistirás al evento</span>
            </BodyContenRightDetailsTitle>
          </MenuHeader>
          <BodyContenRightDetailsSelects>
            {data.fechas.map((e, i) => (
              <SelectDate
                key={i}
                className={`${processData.fecha_selected === e.id ? 'active' : ''}`}
                onClick={
                  () => {
                    setProcessData({
                      ...processData,
                      ...processData.fecha_selected = e.id,
                      ...processData.hora_selected = e.horarios.length > 1 ? null : e.horarios[0] ? e.horarios[0].id : null
                    })
                  }
                }
              >
                {moment(e.fecha).format('ddd DD MMMM')}
              </SelectDate>
            ))}
          </BodyContenRightDetailsSelects>
          {
            !!list_schedules && <Fragment>
              <MenuHeader>
                <BodyContenRightDetailsTitle style={{ lineHeight: '16px' }}>
                  <BodyContenRightDetailsTitleIcon>
                    <img src={iconClock} />
                  </BodyContenRightDetailsTitleIcon>
                  <span style={{ fontWeight: 'normal' }}>Selecciona el horario que más se acomode a tu tiempo.</span>
                </BodyContenRightDetailsTitle>
              </MenuHeader>
              <BodyContenRightDetailsSelects>
                {list_schedules.horarios.map((e, i) => (
                  <SelectDate
                    key={i}
                    className={`${processData.hora_selected === e.id ? 'active' : ''}`}
                    onClick={
                      () => setProcessData({ ...processData, ...processData.hora_selected = e.id })
                    }
                  >
                    {moment(e.hora_inicio).format('hh:mm a')}
                  </SelectDate>
                ))}
              </BodyContenRightDetailsSelects>
            </Fragment>
          }
        </ModalContent>
      case 1:
        return <ModalContent columns='auto 300px'>
          <ModalContentLeft>
            <ModalTitle>Elige tus entradas</ModalTitle>
            {
              data.entradas.length > 0 ? 
                <TicketListContainer>
                  {data.entradas.map((e, i) => (
                    <TicketContent key={i}>
                      <TicketContentName>
                        <Dotted>
                          <TextDashed disabled={e.descripcion.length === 0}>
                            <Tooltip
                              arrow
                              disabled={e.descripcion.length === 0}
                              title={e.descripcion}
                            >
                              {e.nombre}
                            </Tooltip>
                          </TextDashed>
                        </Dotted>
                      </TicketContentName>
                      <TicketQuantity>
                        <TicketQuantityUpDown onClick={() => { removeTicket(e.id) }}><i className="material-icons">remove</i></TicketQuantityUpDown>
                        <TicketQuantitCenter>{(e.selects / e.cantidad_minima) || 0}</TicketQuantitCenter>
                        <TicketQuantityUpDown onClick={() => { addTicket(e.id) }}><i className="material-icons">add</i></TicketQuantityUpDown>
                      </TicketQuantity>
                      {
                        e.entradas_restantes === 0 && (
                          <TicketOfStock>
                            Sin stock
                          </TicketOfStock>
                        )
                      }
                    </TicketContent>
                  ))}
                </TicketListContainer>
                : <div 
                    style={{
                      color: '#7b7c7d',
                      textAlign: 'center',
                      marginTop: 20
                    }}
                  >No hay entradas disponibles</div>
            }
            
          </ModalContentLeft>
          <ModalContentRight>
            {
              renderOrder()
            }
          </ModalContentRight>
        </ModalContent>
      case 2:
        return <ModalContent >
            <BuyerInfoContent>
              <BuyerInfoType>
                <ModalTitle>Información del comprador</ModalTitle>
                <div>
                  <input
                    type={'radio'}
                    onClick={() => setProcessData({ ...processData, ...processData.tipo_cliente = 1 })}
                    defaultChecked={processData.tipo_cliente === 1 ? true : false}
                    name="tipo_cliente"
                    id={'type_natural'}
                  />
                  <label htmlFor='type_natural'>Persona Natural</label>
                </div>
                <div>
                  <input
                    type={'radio'}
                    onClick={() => setProcessData({ ...processData, ...processData.tipo_cliente = 2 })}
                    defaultChecked={processData.tipo_cliente === 2 ? true : false}
                    name="tipo_cliente"
                    id={'type_company'}
                  />
                  <label htmlFor='type_company'>Empresa</label>
                </div>
              </BuyerInfoType>
              <BuyerInfoForm>
                {
                  processData.tipo_cliente === 1 ?
                    <Fragment>
                      <div>
                        <Field
                          name="nombres"
                          sKey={'form-nombres'}
                          defaultValue={processData.form.nombres}
                          onChange={(e) => setFormData('nombres', e)}
                          placeholder={'Nombres'}
                          className={errors.nombres ? 'errorField' : null}
                          sRef={register({
                            required: 'Este campo es requerido',
                            maxLength: {
                              value: 50,
                              message: 'No puede contener más de 50 caracteres.'
                            },
                            minLength: {
                              value: 3,
                              message: 'El nombre es muy pequeño.'
                            },
                          })} />
                        {errors.nombres && <TextValidation>{errors.nombres.message}</TextValidation>}
                      </div>
                      <div>
                        <Field
                          name="apellidos"
                          sKey={'form-apellidos'}
                          defaultValue={processData.form.apellidos}
                          onChange={(e) => setFormData('apellidos', e)}
                          placeholder={'Apellidos'}
                          className={errors.apellidos ? 'errorField' : null}
                          sRef={register({
                            required: 'Este campo es requerido',
                            maxLength: {
                              value: 50,
                              message: 'No puede contener más de 50 caracteres.'
                            },
                            minLength: {
                              value: 3,
                              message: 'El nombre es muy pequeño.'
                            },
                          })}
                        />
                        {errors.apellidos && <TextValidation>{errors.apellidos.message}</TextValidation>}
                      </div>
                      <div>
                        <Field
                          name="dni"
                          sKey={'form-dni'}
                          defaultValue={processData.form.dni}
                          className={errors.dni ? 'errorField' : null}
                          onChange={(e) => setFormData('dni', e)}
                          placeholder={'DNI / Carnet de extranjería'}
                          sRef={register({
                            required: 'Este campo es requerido',
                            maxLength: {
                              value: 11,
                              message: 'No puede contener más de 11 caracteres.'
                            },
                            minLength: {
                              value: 7,
                              message: 'El documento no es válido.'
                            }
                          })}
                        />
                        {errors.dni && <TextValidation>{errors.dni.message}</TextValidation>}
                      </div>
                    </Fragment>
                    : <Fragment>
                      <div>
                        <Field
                          name="razon_social"
                          defaultValue={processData.form.razon_social}
                          sKey={'form-razon-social'}
                          className={errors.razon_social ? 'errorField' : null}
                          onChange={(e) => setFormData('razon_social', e)}
                          sRef={register({
                            required: 'Este campo es requerido',
                            maxLength: {
                              value: 50,
                              message: 'No puede contener más de 50 caracteres.'
                            },
                            minLength: {
                              value: 3,
                              message: 'El nombre es muy pequeño.'
                            }
                          })}
                          placeholder={'Razón social'}
                        />
                        {errors.razon_social && <TextValidation>{errors.razon_social.message}</TextValidation>}
                      </div>
                      <div>
                        <Field
                          name="ruc"
                          defaultValue={processData.form.ruc}
                          sKey={'form-ruc'}
                          className={errors.ruc ? 'errorField' : null}
                          onChange={(e) => setFormData('ruc', e)}
                          sRef={register({
                            required: 'Este campo es requerido',
                            maxLength: {
                              value: 11,
                              message: 'No puede contener más de 11 caracteres.'
                            },
                            minLength: {
                              value: 11,
                              message: 'El RUC no es válido.'
                            }
                          })}
                          placeholder={'RUC'}
                        />
                        {errors.ruc && <TextValidation>{errors.ruc.message}</TextValidation>}
                      </div>
                    </Fragment>
                }
                <div>
                  <Field
                    name="telefono"
                    defaultValue={processData.form.telefono}
                    className={errors.telefono ? 'errorField' : null}
                    onChange={(e) => setFormData('telefono', e)}
                    sRef={register({
                      required: 'Este campo es requerido'
                    })}
                    placeholder={'Número de celular'}
                  />
                  {errors.telefono && <TextValidation>{errors.telefono.message}</TextValidation>}
                </div>
                <div>
                  <Field
                    name='email'
                    defaultValue={processData.form.email}
                    className={errors.email ? 'errorField' : null}
                    onChange={(e) => {
                      e.target.value = e.target.value.toLowerCase()
                      setFormData('email', e)
                    }}
                    sRef={register({
                      required: 'Este campo es requerido',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Necesitamos un email válido"
                      }
                    })}
                    placeholder={'Correo electrónico'} 
                    suffix={
                      <Tooltip arrow title={'Recomendamos usar un correo personal. Por seguridad, los correos corporativos son limitados a solo mensajes internos.'} ><i className="material-icons">info</i></Tooltip>
                    }
                    />
                  {errors.email && <TextValidation>{errors.email.message}</TextValidation>}
                </div>

              </BuyerInfoForm>
            </BuyerInfoContent>

            {/** 
              <ModalTitle style={{ marginLeft: 22 }}>Información de las entradas</ModalTitle>

            <EventScroller style={{ maxHeight: 230, minHeight: processData.dnis.length >= 4 || selected_tickets.length > 1 ? 174 : 125 }}>
              {
                selected_tickets.map((e, i) =>
                  <TicketContentDocument key={'tickets-select-dni' + e.id}>
                    <TicketContentDocumentHeader>
                      <TicketContent>
                        <TicketContentName>
                          <Dotted><b>{pad(e.selects, 2)}</b> {plural('entrada', e.selects, 's')} para: {e.nombre} </Dotted>
                        </TicketContentName>
                        <TicketQuantity>
                          <TicketQuantityUpDown onClick={() => {
                            if (processData.dnis.length > e.cantidad_minima) {
                              removeTicket(e.id)
                            } else {
                              return message.warning('Se necesita al menos ' + e.cantidad_minima+' entrada(s) seleccionada(s).')
                            }
                          }}><i className="material-icons">remove</i></TicketQuantityUpDown>
                          <TicketQuantitCenter>{e.selects || 0}</TicketQuantitCenter>
                          <TicketQuantityUpDown onClick={() => { addTicket(e.id) }}><i className="material-icons">add</i></TicketQuantityUpDown>
                        </TicketQuantity>
                      </TicketContent>
                    </TicketContentDocumentHeader>
                    <TicketContentDocumentList>
                      {[...Array(e.selects)].map((x, ei) => {
                        let value = processData.dnis.filter(x => x.evento_entrada_id === e.id);
                        value = value[ei] ? value[ei].dni : ''
                        return (
                          <Field
                            key={'random-' + e.id + '-' + ei}
                            sKey={'dni-' + e.id + '-' + ei}
                            name={`dnis[${e.id}][${ei}]`}
                            className={errors["dnis[" + e.id + "][" + ei + "]"] ? 'errorField' : null}
                            defaultValue={value}
                            onChange={(m) => setDNI(ei, e.id, m)}
                            sRef={register({
                              required: 'Este campo es requerido'
                            })}
                            placeholder={'DNI #' + (ei + 1)}
                          />)
                      }
                      )}
                    </TicketContentDocumentList>
                  </TicketContentDocument>
                )
              }
            </EventScroller>
            */}
         
        </ModalContent>
      case 3:
        return <Fragment><ModalContent style={{ borderTop: '1px solid #D4DEEA', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
          <ProcessResumenHeader>
            <h3>{data.nombre}</h3>
          </ProcessResumenHeader>
          <ProcessResumenContent>
            {
              selected_tickets.map((e, i) =>
                <ProcessResumenContentItem key={'resumen-ticket-' + e.id}>
                  <Dotted><b>{pad((e.selects / e.cantidad_minima), 2)}</b> {plural('entrada', e.selects, 's')} para: {e.nombre}</Dotted>
                  <span>S/ {(e.selects / e.cantidad_minima) * e.precio_final}</span>
                </ProcessResumenContentItem>
              )}
              {
                processData.comision > 0 && (
                  <ProcessResumenContentItem style={{ marginTop: 20 }}>
                    <Dotted>Comisión de Duuvi <Tooltip arrow title={'Costos por uso de la plataforma, pasarela de pagos y servicios adicionales.'} ><i className="material-icons">info</i></Tooltip></Dotted>
                    <span>S/ {processData.comision}</span>
                  </ProcessResumenContentItem>
                )
              }
            {
              processData.discount != 0 && (
                <ProcessResumenContentItem style={{ color: '#E37879' }}>
                  <Dotted>Descuento</Dotted>
                  <span>S/ {processData.discount}</span>
                </ProcessResumenContentItem>
              )
            }
          </ProcessResumenContent>
          <ProcessResumenFooter>
            <ProcessResumenContentItem className='b-600'>
              <Dotted>Total</Dotted>
              <span>S/ {(processData.paymentPrice - processData.discount) + processData.comision}</span>
            </ProcessResumenContentItem>
          </ProcessResumenFooter>
          {
            data.has_coupons && (
              <BuyerInfoContentCupon>
                <div>
                  <span>¿Tienes un <u style={{ cursor: 'help' }}><Tooltip title='Código promocional / Código de Gift Card'>cupón</Tooltip></u>?</span>
                  <Input value={processData.cupon} onChange={(e) => setProcessData({ ...processData, ...processData.cupon = e.target.value })} placeholder={''} />
                </div>
                <Button disabled={processData.cupon.length === 0} link onClick={() => fetchCoupon()}>Aplicar</Button>
              </BuyerInfoContentCupon>
            )
          }
        </ModalContent>

          {/* <ProcessAviso>
            {
              security()
            }
          </ProcessAviso> */}
        </Fragment>
      case 4:
        return <ModalContent style={{ marginTop: 30, textAlign: 'center', padding: '0 20px', marginBottom: 40 }}>
          <img src={imageFinish} style={{ margin: '40px auto 10px', maxWidth: '100%', width: 180 }} />
          <br />
          <ModalTitle style={{ marginBottom: 10 }}>¡Excelente, ya tienes tus entradas!</ModalTitle>
          <p>Tu compra se realizó con éxito.</p>
          <p><b>Procesaremos tu entrada</b> y enviaremos a tu correo el <b>CÓDIGO QR</b> para que puedas ingresar al evento.</p>
          <p style={{ fontSize: 11, marginTop: 5, color: '#a7a7a7' }}>En caso no encuentres el correo, revisa tu bandeja de "No deseados".</p>
          {
            // <p>No olvides revisar tu correo, te hemos enviado el <b>CÓDIGO QR</b> para que puedas ingresar al evento.</p>
            // <p style={{ fontSize: 11, marginTop: 5, color: '#a7a7a7' }}>En caso no encuentres el correo, revisa tu bandeja de "No deseados".</p>
          }
          <SeparatorBlue />
          <p style={{ fontWeight: 300 }}>¿Quieres que tus amigos se enteren de este evento?</p>

          <SocialLinks>
            <a target='_blank' href={'https://api.whatsapp.com/send?text='+linkShare('whatsapp')} data-action="share/whatsapp/share"><img src={iconwhatsapp} /></a>
            <a target='_blank' href={'https://twitter.com/intent/tweet?text=' + linkShare('twitter')}><img src={icontwitter} /></a>
            <a target='_blank' href={'https://www.facebook.com/sharer/sharer.php?u=' + linkShare('facebook')}><img src={iconfacebook} /></a>
          </SocialLinks>
        </ModalContent>
      default:
        break;
    }
  }

  const sendPayment = () => {
    let totalTickets = processData.dnis.length
    let totalPrice = (processData.paymentPrice - processData.discount) + processData.comision
    setProcessData({
      ...processData,
      ...processData.loading = true,
      ...processData.loadingText = 'Validando información'
    })

    API.request('buy/validate/' + data.id, 'POST', {
      monto: processData.paymentPrice.toFixed(2),
      nombre: processData.form.nombres,
      razon_social: processData.form.razon_social,
      ruc: processData.form.ruc,
      apellido: processData.form.apellidos,
      telefono: processData.form.telefono,
      email: processData.form.email,
      dni: processData.form.dni,
      evento_id: data.id,
      evento_fecha_hora_id: processData.hora_selected,
      dnis: processData.dnis,
      tipo_cliente: processData.tipo_cliente,
      cupon_id: processData.paymentDiscountId,
      descuento: processData.discount
    }).then((response) => {
      if (response.data.respuesta) {
        setProcessData({
          ...processData,
          ...processData.tokenBuy = response.data.token
        })
        if (processData.type_payment === 'tarjeta' && totalPrice != 0 && totalTickets > 0) {
          Culqi.publicKey = 'pk_live_73E0u4Htmrq6h9zP' // 'pk_test_FDtrYctVRH1oClvO'
          Culqi.options({
            style: {
              maincolor: '#1E71ED'
            }
          });
          Culqi.settings({
            title: 'Duuvi',
            currency: 'PEN',
            description: processData.dnis.length + ' entradas',
            amount: (processData.paymentPrice - processData.discount + processData.comision) * 100,
            order: 'sku_486634'
          });
          setTimeout(function () {
            setProcessData({
              ...processData,
              ...processData.loading = false,
              ...processData.loadingText = ''
            })
            Culqi.open();
          }, 1000);
        } else if (totalPrice == 0 && totalTickets > 0) {
          processPay({
            token: {
              id: 'free'
            }
          })
        }
      }
    }).catch(function (error) {
      setProcessData({
        ...processData,
        ...processData.loading = false,
        ...processData.loadingText = ''
      })
      API.response(error)
    });
  }

  const processPay = (res) => {
    setProcessData({
      ...processData,
      ...processData.loading = true,
      ...processData.loadingText = '<h3>Procesando el pedido.</h3> No cierres esto ni actualices la página hasta que se complete el pedido.'
    })
    API.request('buy/' + data.id, 'POST', {
      tokenCrud: processData.tokenBuy,
      token: res.id || 'free',
    }).then((response) => {
      setProcessData({
        ...processData,
        ...processData.loading = false,
        ...processData.loadingText = ''
      })
      if (response.data.outcome.code == "AUT0000") {
        setModalStep(modalStep + 1)
        setToTop(); 
      } else {
        alert("Ocurrió un error con el pago")
      }
    }).catch(function (error) {
      if (error.response.status === 400 || error.response.status === 402 || error.response.status === 422){ 
        message.error(error.response.data.user_message)
      } else {
        message.error('Ocurrió un error al procesar el pago. Por favor intente de nuevo.')   
      }
      setProcessData({
        ...processData,
        ...processData.loading = false,
        ...processData.loadingText = ''
      })
    });
  }

  const rangePricesTicket = data.entradas.map(e => e.precio_final).sort((a, b) => a - b)
  return (
    <Container>
      <Head>
        <title>{data.nombre} - Duuvi</title>
        <meta property="og:image" content={data.imagen} />
        <meta name="description" content={data.descripcion.replace(/<[^>]*>/g, "").substring(0, 157)+'...'} />
      </Head>
      {
        processData.loading && (
          <LoadingProcess>
            <div className="innerLoading">
              <svg
                version="1.1"
                id="loader-1"
                x="0px"
                y="0px"
                width="40px"
                height="40px"
                viewBox="0 0 40 40"
                enableBackground="new 0 0 40 40">
                <path opacity="0.2" fill="#16b5f0" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                        s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                        c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"></path>
                    <path fill="#4f80ff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                        C22.32,8.481,24.301,9.057,26.013,10.047z" transform="rotate(36 20 20)">
                        <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"></animateTransform>
                        </path>
                </svg><br/>
                <p dangerouslySetInnerHTML={{ __html: processData.loadingText }}></p>
            </div>
          </LoadingProcess>
        )
      }
      {
        //Verificamos si el proceso de compra está activo y si es mobile
        isMobile && modalOpen ? (
          <ModalOrViewProcess modal={{ modalOpen, setModalOpen }} step={{ modalStep, setModalStep }}>
            {processBuyContainer()}
          </ModalOrViewProcess>
        )
          :
          <Fragment>
            <WrapBackgroundImageBlured>
              <BackgroundImageBlured
                style={{
                  backgroundImage:
                    'url('+data.imagen+')',
                }}
              />
            </WrapBackgroundImageBlured>
            <Content>
              <DuuviImage />
              <WrapCover
                style={{
                  backgroundImage:
                    'url('+data.imagen+')',
                  paddingTop: ((imageBackgroundData.height / imageBackgroundData.width) * 100)+'%'
                }}
              >
                <WrapCoverText>
                  <CoverText>
                    <CoverTextIcon
                      style={{ backgroundImage: 'url(/static/icons/date_range.svg)' }}
                    />
                    {
                      data.fechas.map(s => moment(s.fecha).format('ddd DD MMM')).join(" - ")
                    }
                  </CoverText>
                  <CoverText>
                    <CoverTextIcon
                      style={{ backgroundImage: 'url(/static/icons/place.svg)' }}
                    />
                    {data.direccion}
                  </CoverText>
                </WrapCoverText>
              </WrapCover>
              <BodyContent>
                <Title>{data.nombre}</Title>
                <BodyContentCols>
                  <BodyContenLeft>
                    <TitleBody>Descripción del evento</TitleBody>
                    <Description>
                      <div dangerouslySetInnerHTML={{ __html: data.descripcion }} />
                    </Description>
                    <TitleBody>Ubicación del evento</TitleBody>
                    <div style={styleMaps}>
                      <Map
                        id='map'
                        options={mapOptions}
                        onMapLoad={() => {
                          /* console.log('ya ta") */
                        }}
                      />
                    </div>
                  </BodyContenLeft>
                  <BodyContenRight>
                    <BodyContenRightTitle>Adquiere tus entradas</BodyContenRightTitle>

                    <BodyContenRightDetails>
                      <MenuHeader>
                        <BodyContenRightDetailsTitle>
                          <BodyContenRightDetailsTitleIcon>
                            <img src={iconCalendar} />
                          </BodyContenRightDetailsTitleIcon>
                          Fechas disponibles
                        </BodyContenRightDetailsTitle>
                        <span>Selecciona la fecha en la que asistirás al evento</span>
                      </MenuHeader>
                      <BodyContenRightDetailsSelects>
                        {data.fechas.map((e, i) => (
                          <SelectDate
                            key={i}
                            className={`${processData.fecha_selected === e.id ? 'active' : ''}`}
                            onClick={
                              () => {
                                setProcessData({
                                  ...processData,
                                  ...processData.fecha_selected = e.id,
                                  ...processData.hora_selected = e.horarios.length > 1 ? null : e.horarios[0] ? e.horarios[0].id : null
                                })
                              }
                            }
                          >
                            {moment(e.fecha).format('ddd DD MMMM')}
                          </SelectDate>
                        ))}
                      </BodyContenRightDetailsSelects>
                      {
                        !!list_schedules && <Fragment>
                          <MenuHeader>
                            <BodyContenRightDetailsTitle>
                              <BodyContenRightDetailsTitleIcon>
                                <img src={iconClock} />
                              </BodyContenRightDetailsTitleIcon>
                              Horario disponibles
                              </BodyContenRightDetailsTitle>
                            <span>{list_schedules.horarios.length > 1 && ('Selecciona el horario que más se acomode a tu tiempo.')}</span>
                          </MenuHeader>
                          <BodyContenRightDetailsSelects>
                            {list_schedules.horarios.map((e, i) => (
                              <SelectDate
                                key={i}
                                className={`${processData.hora_selected === e.id ? 'active' : ''}`}
                                onClick={
                                  () => setProcessData({ ...processData, ...processData.hora_selected = e.id })
                                }
                              >
                                {moment(e.hora_inicio).format('hh:mm a')}
                              </SelectDate>
                            ))}
                          </BodyContenRightDetailsSelects>
                        </Fragment>
                      }

                      <WrapButton>
                        <Tooltip 
                          title={'Primero debes seleccionar una fecha.'}
                          disabled={data.entradas.length === 0 || !!processData.fecha_selected}
                          arrow
                          >
                          <Button
                            disabled={data.entradas.length === 0 || !(processData.hora_selected && processData.fecha_selected)}
                            onClick={() => {
                              setToTop(true)
                              resetProcess(true)
                            }}
                          >
                            {data.entradas.length === 0 ? 'ENTRADAS AGOTADAS' : 'COMPRAR ENTRADA'} 
                          </Button>
                        </Tooltip>
                      </WrapButton>
                      {
                        data.entradas.length > 0 && (
                          <Pricing style={{ display: data.id === 6 ? 'none' : '' }}>
                            S/ {rangePricesTicket[0]} <PricingArrow /> S/ {rangePricesTicket[rangePricesTicket.length - 1]}
                          </Pricing>
                        )
                      }
                      
                      <Payments>
                        <img src={iconVisa} />
                        <img src={iconMastercard} />
                        <img src={iconDinersClub} />
                        <img src={iconAmex} />
                      </Payments>
                    </BodyContenRightDetails>
                    {
                      renderSecurity()
                    }
                  </BodyContenRight>
                </BodyContentCols>
              </BodyContent>
              <ModalOrViewProcess modal={{ modalOpen, setModalOpen }} step={{ modalStep, setModalStep }}>
                {processBuyContainer()}
              </ModalOrViewProcess>
            </Content>
            <Footer />
            <ButtonFloat>
              <Button
                disabled={data.entradas.length === 0}
                onClick={() => {
                  setToTop(true)
                  resetProcess(true, 0)
                }}
              >
                {data.entradas.length === 0 ? 'ENTRADAS AGOTADAS' : 'COMPRAR ENTRADA'}
              </Button>
            </ButtonFloat>
          </Fragment>
      }
    </Container>
  );
};

const ModalOrViewProcess = ({ children, modal }) => {
  const size = windowResize();
  if (modal.modalOpen) {
    if (size.width <= 799) {
      return <ViewProcess>
        {
          children
        }
      </ViewProcess>
    }
    else {
      return <Modal onClose={()=>{}} showCloseIcon={false} styles={{
        overlay:{
          backgroundColor: 'rgba(6, 15, 27, 0.7)'
        },
        modal: {
          padding: '20px 30px 0',
          borderRadius: 4
        }
      }} center open={modal.modalOpen}>
        {children}
      </Modal>
    }
  } else {
    return null
  }
}

const EventScroller = ({ style, children }) => {
  const size = windowResize();
  if (false) { //size.width >= 799
    return <Scrollbar style={style}
      renderer={props => {
        const { elementRef, ...restProps } = props;
        return <span {...restProps} ref={elementRef} className="MyAwesomeScrollbarsHolder" />;
      }}
      thumbYProps={{
        renderer: props => {
          const { elementRef, ...restProps } = props;
          restProps.style.background = '#203868'
          restProps.style.opacity = '0.6'
          restProps.style.width = '5px'
          return <div {...restProps} ref={elementRef} className="ScrollbarsCustom-Thumb ScrollbarsCustom-ThumbY " />;
        }
      }}
      trackYProps={{
        renderer: props => {
          const { elementRef, ...restProps } = props;
          restProps.style.width = '5px'
          restProps.style.right = '5px'
          return <span {...restProps} ref={elementRef} />;
        }
      }}
    >
      {
        children
      }
    </Scrollbar>
  }
  return children

}

export default EventViewTemplate;
