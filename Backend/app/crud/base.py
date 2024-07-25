from sqlalchemy.orm import session

def create(db: Session, model, data):
    db_obj = model(**data)
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj


def make():
    """

        def add(a, b):
            return a + b

        list_ = [1, 2]
        dict_ = {"a": 1, "b": 2}

        add(1, 2) ==> add(*list_) ===> *list_ ==> 1, 2
        add(1, 2) ==> add(**dict_) ===> **dict_ ==> a=1,

        class DoctorsSchema(BaseModel):
        name: str
        image_url: str
        
        from app.models import Doctor

        create(db=db, model=Doctor, data=DoctorSchema)
            db_user = model(**data) => Doctor(name="John", image_url="https://example.com/john.jpg")

        create(db=db, model=Appointment, data=AppointmentSchema)
            db_user = model(**data) => Appointment()

                    
    """