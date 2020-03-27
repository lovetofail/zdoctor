import React from "react";
import { Router, Route } from "./components/Router";
import { useSelector, useDispatch } from "react-redux";
import {
  Splash,
  FindDoctor,
  ReservationCalendar,
  Login,
  DoctorCalendar,
  DoctorProfile,
  SessionDetail,
  PatientProfile,
  DoctorAvailablities
} from "./screens";
import { getUser } from "./api/user";
import { setPatientAction } from "./redux/actions/patientActions";
import { tokenSelector, userTypeSelector } from "./redux/selectors";
import { setDoctorAction } from "./redux/actions/doctorActions";
import NotificationHandler from "./components/NotificationHandler";

export default function Routes() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  const [needAuth, setNeedAuth] = React.useState(true);

  const accessToken = useSelector(tokenSelector);
  const userType = useSelector(userTypeSelector);

  React.useEffect(() => {
    async function auth() {
      try {
        setIsLoading(true);
        if (!accessToken) {
          throw new Error("access token not found");
        }
        const userProfile = await getUser(accessToken);

        if (userType === "doctor") {
          dispatch(setDoctorAction(userProfile.doctor));
        } else {
          dispatch(setPatientAction(userProfile.patient));
        }

        setNeedAuth(false);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.log({ error: error.message });
        setIsLoading(false);
        setNeedAuth(true);
      }
    }
    auth();
  }, [accessToken, dispatch]);

  return (
    <>
      <Router>
        {isLoading ? (
          <Route exact path="/" component={Splash} />
        ) : needAuth ? (
          <Route exact path="/" component={Login} />
        ) : userType === "patient" ? (
          <>
            <Route exact path="/" component={FindDoctor} />
            <Route exact path="/ReservationCalendar" component={ReservationCalendar} />
            <Route exact path="/PatientProfile" component={PatientProfile} />
          </>
        ) : (
          <>
            <Route exact path="/" component={DoctorCalendar} />
            <Route exact path="/DoctorProfile" component={DoctorProfile} />
            <Route exact path="/DoctorAvailablities" component={DoctorAvailablities} />
            <Route exact path="/SessionDetail" component={SessionDetail} />
          </>
        )}
      </Router>
      {!needAuth && <NotificationHandler />}
    </>
  );
}
