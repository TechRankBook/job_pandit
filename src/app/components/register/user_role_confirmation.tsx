'use client';
import React, { useState } from "react";
import Image from "next/image";
import RegisterForm from "../forms/register-form";
import google from "@/assets/images/icon/google.png";
import facebook from "@/assets/images/icon/facebook.png";
import { signUpGoogle } from "@/hooks/user/signUpGoogle";
import UserRoleForm from "../forms/user-role";

const UserRoleConfirmation = () => {
    

    return (
        <section className="registration-section position-relative pt-100 lg-pt-80 pb-150 lg-pb-80">
            <div className="container">
                <div className="user-data-form">
                    <div className="text-center">
                        <h2>You Want To Be A</h2>
                    </div>
                    <div className="form-wrapper m-auto">
                        <ul className="nav nav-tabs border-0 w-100 mt-30" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link active"
                                    data-bs-toggle="tab"
                                    data-bs-target="#fc1"
                                    role="tab"
                                    aria-selected="true"
                                    tabIndex={-1}
                                >
                                    Candidates
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link"
                                    data-bs-toggle="tab"
                                    data-bs-target="#fc2"
                                    role="tab"
                                    aria-selected="false"
                                    tabIndex={-1}
                                >
                                    Company
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link"
                                    data-bs-toggle="tab"
                                    data-bs-target="#fc3"
                                    role="tab"
                                    aria-selected="false"
                                    tabIndex={-1}
                                >
                                    Consultant
                                </button>
                            </li>
                        </ul>
                        <div className="tab-content mt-40">
                            <div
                                className="tab-pane fade show active"
                                role="tabpanel"
                                id="fc1"
                            >
                                <UserRoleForm />
                            </div>
                            <div className="tab-pane fade" role="tabpanel" id="fc2">
                                
                            </div>
                            <div className="tab-pane fade" role="tabpanel" id="fc3">
                                
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserRoleConfirmation;
