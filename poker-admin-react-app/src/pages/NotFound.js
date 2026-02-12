/*
 * Copyright 2025 Wildace Private Limited - All Rights Reserved
 *
 * Licensed under Wildace Software License Agreement ("License").
 * You may not use this file except in compliance with the License.
 *
 * NOTICE
 * ALL INFORMATION CONTAINED HEREIN IS, AND REMAINS THE PROPERTY OF WILDACE PRIVATE LIMITED.
 * THE INTELLECTUAL AND TECHNICAL CONCEPTS CONTAINED HEREIN ARE PROPRIETARY TO WILDACE PRIVATE LIMITED AND ARE PROTECTED BY TRADE SECRET OR COPYRIGHT LAW.
 * DISSEMINATION OF THIS INFORMATION OR REPRODUCTION OF THIS MATERIAL IS STRICTLY FORBIDDEN UNLESS PRIOR WRITTEN PERMISSION IS OBTAINED FROM WILDACE PRIVATE LIMITED.
 * **********************************************************************************************************************************************************************
 * Change History
 * **********************************************************************************************************************************************************************
 * |     Date      |     Name     |      Change     |      Details
 * |  01/08/2025   | Wilson Sam   |     Created     |  File Creation
 * **********************************************************************************************************************************************************************
 * */
import React, { Component } from "react";
import { Button } from "primereact/button";

export default class NotFound extends Component {
  render() {
    return (
      <div className="exception-body notfound">
        <div className="exception-panel">
          <div className="exception-content">
            <img src="assets/layout/images/pages/icon-404.svg" alt="roma" />
            <h1>Page Not Found</h1>
            <p>Requested resource is not available.</p>

            <Button
              label="Go To Dashboard"
              onClick={() => {
                window.location = "/#";
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
