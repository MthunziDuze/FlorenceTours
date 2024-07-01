import React, { useState, useEffect } from "react";

import activityService from "../services/activity.service";
import locationActivityService from "../services/location.activity.service";
import Button from "../Components/buttonComponent";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import locationService from "../services/location.service";

const LocationActivitiesPage = () => {
  const [locationActivity, setLocationActivity] = useState({
    name: "",
    price: 0,
    description: "",
    ageRestriction: 0,
    startDate: Date,
    endDate: Date,
    locationId: 0,
    vacationId: 0,
    activityId: 0,
  });
  const [activities, setActivities] = useState([]);

  const [locations, setLocations] = useState([]);

  function handleDateChange(e) {
    const id = e.target.id;
    const value = e.target.value;
    if (id === "startDate") {
      updatestartDate(value);
    } else if (id === "endDate") {
      updateendDate(value);
    }
  }

  const updatestartDate = (startDate) => {
    setLocationActivity((previosState) => {
      return { ...previosState, startDate: startDate };
    });
  };

  const updateendDate = (endDate) => {
    setLocationActivity((previosState) => {
      return { ...previosState, endDate: endDate };
    });
  };

  const locationActivityChange = (a) => {
    setLocationActivity({ ...locationActivity, [a.target.id]: a.target.value });
  };

  function handleSelectChange(evt) {
    let select_value = Number.parseInt(evt.target.value);
    let select_name = evt.target.id;

    if (select_name === "location") {
      updateLocation(select_value);
    } else if (select_name === "activity") {
      updateActivity(select_value);
    }
  }
  const updateLocation = (newLocation) => {
    setLocationActivity((previosState) => {
      return { ...previosState, locationId: newLocation };
    });
  };
  const updateActivity = (newActivityId) => {
    setLocationActivity((previosState) => {
      return { ...previosState, activityId: newActivityId };
    });
  };
  useEffect(() => {
    console.log(locationActivity);
  }, [locationActivity]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await locationActivityService
      .create(locationActivity)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("err saving Vacation Activity info", err);
      });
  };
  // const removeLocationActivity = (activity) => {
  //   activities.push(activity);
  //   setLocationActivity(activities);
  //   const data1 = data.filter((ac) => ac != activity);
  //   setData(data1);
  // };

  useEffect(() => {
    (async () => {
      const response = await locationService.getAll();
      let locations = response.data;

      console.log(locations);

      setLocations(locations);
      const activityList = await activityService.getAll();
      let activities = activityList.data;
      setActivities(activities);
    })();
  }, []);
  return (
    <div className="container">
      <Card>
        <Form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Maintain Location Activities</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Location Name
              </label>
              <select
                required
                class="form-select"
                id="location"
                onChange={handleSelectChange}
                aria-label="Select Location"
              >
                <option selected value="">
                  Select Location
                </option>
                {locations.map((location, index) => {
                  return (
                    <option value={location.id} key={index}>
                      {location.placename}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="mb-3">
              <select
                required
                class="form-select"
                id="activity"
                onChange={handleSelectChange}
                aria-label="Select Location"
              >
                <option selected defaultChecked value="">
                  Select Activity
                </option>
                {activities.map((activity, index) => {
                  return (
                    <option value={activity.id} key={index}>
                      {activity.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="ageRestriction" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={locationActivity.name}
                onChange={locationActivityChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="text"
                className="form-control"
                id="price"
                value={locationActivity.price}
                onChange={locationActivityChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ageRestriction" className="form-label">
                Age Restriction
              </label>
              <input
                type="text"
                className="form-control"
                id="ageRestriction"
                value={locationActivity.ageRestriction || ""}
                onChange={locationActivityChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="description"
                className="form-control"
                id="description"
                value={locationActivity.description || ""}
                onChange={locationActivityChange}
              />
            </div>
            <Row>
              <Form.Group as={Col} controlId="startDate">
                <label htmlFor="fromDate" className="form-label">
                  Start Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  key={"startDate"}
                  value={locationActivity.startDate || Date.now()}
                  onChange={handleDateChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="endDate">
                <label htmlFor="endDate" className="form-label">
                  To Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  key={"endDate"}
                  value={locationActivity.endDate || Date.now()}
                  onChange={handleDateChange}
                />
                <Form.Control.Feedback type="invalid">
                  Vacation From Date is required
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
          </CardBody>
          <CardFooter>
            <Button type="Submit" onClick={handleSubmit}>
              Save Vacation Activities
            </Button>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
};

export default LocationActivitiesPage;
