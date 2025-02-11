import {useForm} from 'react-hook-form'
import Input from './UI/Input'

import ImagePicker from './UI/ImagePicker'
import moment from 'moment'

export default function CheckoutForm({food, children, SubmitFn}) {
    const {
        register,
        handleSubmit,
        formState: {errors},
        watch,
    } = useForm()

    const selectedImg = watch('image-upload')
    const currentDate = moment().format('YYYY-MM-DD')

    async function onSubmit(foodData) {
        let image = new FormData()
        if (foodData['image-upload'][0]) {
            image.append('file', foodData['image-upload'][0])
        } else {
            image = food?.image
        }

        delete foodData['image-upload']

        const date = moment(foodData.date).format('DD MMM YYYY')
        const price = Number(foodData.price).toFixed(2)

        if (food) {
            foodData = {...foodData, date, price, id: food.id}
        } else {
            foodData = {...foodData, date, price}
        }

        SubmitFn({newFood: foodData, image})
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="control">
            <Input
                label="Title"
                name="name"
                register={register}
                required={{
                    required: 'Title is required.',
                    maxLength: {value: 50, message: 'Max length is 50 characters'},
                    minLength: {value: 5, message: 'Min length is 5 characters'},
                }}
                error={errors['name']}
                defaultValue={food?.name}
            />
            <Input
                label="Description"
                name="description"
                register={register}
                required={{
                    required: 'Description is required',
                    maxLength: {value: 150, message: 'Max length is 150 characters'},
                    minLength: {value: 10, message: 'Min length is 10 characters'},
                }}
                textarea
                rows="3"
                error={errors['description']}
                defaultValue={food?.description}
            />
            <Input
                label="Date"
                name="date"
                register={register}
                required={{
                    required: 'Date is required',
                    min: {
                        value: '2023-01-01',
                        message: 'Date must be after 2023-1-1',
                    },
                    max: {
                        value: currentDate,
                        message: `Date must be today or in the past `,
                    },
                }}
                type="date"
                error={errors['date']}
                defaultValue={food ? moment(food.date).format('YYYY-MM-DD') : null}
            />
            <Input
                label="Price $"
                step="any"
                name="price"
                register={register}
                required={{
                    required: 'Price is required',
                    min: {
                        value: 5,
                        message: 'Price must be at least 10$',
                    },
                    max: {
                        value: 100,
                        message: 'Price must be under 100$',
                    },
                }}
                type="number"
                error={errors['price']}
                defaultValue={food?.price}
            />

            <ImagePicker
                register={register}
                required={food ? null : {required: 'Image must be selected'}}
                name="image-upload"
                error={errors['image-upload']}
                imageFile={selectedImg}
                defaultValue={food?.image}
            />

            {children}
        </form>
    )
}
