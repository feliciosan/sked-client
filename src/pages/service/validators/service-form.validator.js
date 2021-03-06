import * as Yup from 'yup';

const durationLimit = 1440;

export default {
    form: {
        initialValues: {
            id: '',
            name: '',
            duration: null,
			price: null,
			showPrice: true,
        },
        validator: Yup.object({
			name: Yup.string().required('Este campo é obrigatório'),
			price: Yup.string(),
			showPrice: Yup.boolean(),
			duration: Yup.number()
				.typeError('Digite uma duração válida')
				.test('duration-test', 'A duração não pode exceder 24 horas.', (value) => value <= durationLimit)
        }),
    },
};
